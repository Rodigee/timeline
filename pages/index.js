import React, { useState, useEffect } from 'react';

export default function TimelineGame() {
  const [events, setEvents] = useState([]);
  const [placedEvents, setPlacedEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [recentlyPlacedIndex, setRecentlyPlacedIndex] = useState(null);

  const fetchEvents = (date) => {
    const [year, month, day] = date.split('-');
    fetch(`/api/historicalEvents?month=${month}&day=${day}`)
      .then(response => response.json())
      .then(json => {
        setEvents(json);
        startGame(json);
      })
      .catch(error => console.error(error));
  };

  const startGame = (eventsList) => {
    if (eventsList.length > 0) {
      const randomIndex = Math.floor(Math.random() * eventsList.length);
      const firstEvent = eventsList[randomIndex];
      setPlacedEvents([firstEvent]);
      const remainingEvents = eventsList.filter((_, index) => index !== randomIndex);
      setEvents(remainingEvents);
      setScore(0);
      setFeedback(null);
      setGameOver(false);
      setRecentlyPlacedIndex(null);
      getNextEvent(remainingEvents);
    }
  };

  const getNextEvent = (remainingEvents) => {
    if (remainingEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingEvents.length);
      setCurrentEvent(remainingEvents[randomIndex]);
      setEvents(remainingEvents.filter((_, index) => index !== randomIndex));
    } else {
      setGameOver(true);
    }
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    resetGame(newDate);
  };

  const resetGame = (date) => {
    setPlacedEvents([]);
    setCurrentEvent(null);
    setGameOver(false);
    setScore(0);
    setFeedback(null);
    setRecentlyPlacedIndex(null);
    fetchEvents(date);
  };

  const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date(2023, 11, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };

  const handleRandomDateReset = () => {
    const randomDate = getRandomDate();
    setSelectedDate(randomDate);
    resetGame(randomDate);
  };

  const handlePlaceEvent = (guessedIndex) => {
    if (!currentEvent || gameOver) return;

    const newPlacedEvents = [...placedEvents];

    const correctIndex = newPlacedEvents.findIndex(event => event.year > currentEvent.year);
    const actualIndex = correctIndex === -1 ? newPlacedEvents.length : correctIndex;

    const isCorrect = guessedIndex === actualIndex;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback({ message: "Correct!", isCorrect: true });
    } else {
      setFeedback({
        message: "Incorrect! The event belongs " +
          (actualIndex < guessedIndex ? "earlier" : "later") + " in the timeline.",
        isCorrect: false
      });
    }

    newPlacedEvents.splice(actualIndex, 0, currentEvent);
    setPlacedEvents(newPlacedEvents);
    setRecentlyPlacedIndex(actualIndex);

    // Immediately get the next event
    if (events.length > 0) {
      getNextEvent(events);
    } else {
      setCurrentEvent(null);
      setGameOver(true);
    }

    // Clear feedback and highlighting after delay
    setTimeout(() => {
      setFeedback(null);
      setRecentlyPlacedIndex(null);
    }, 2000);
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    resetGame(today);
  }, []);

  const renderTimelineItem = (event, index) => (
    <React.Fragment key={event.year}>
      <li className={`p-2 rounded ${index === recentlyPlacedIndex ? 'bg-yellow-200 font-bold' : 'bg-gray-100'}`}>
        {event.year}: {event.event}
      </li>
      {!gameOver && (
        <li>
          <button
            onClick={() => handlePlaceEvent(index + 1)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded my-2"
          >
            Place here
          </button>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <section className="p-4">
      <div className="mb-4 flex items-center space-x-2">
        <div>
          <label htmlFor="datePicker" className="block mb-2">Select a date:</label>
          <input
            type="date"
            id="datePicker"
            value={selectedDate}
            onChange={handleDateChange}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleRandomDateReset}
          className="bg-green-500 text-white px-4 py-2 rounded mt-6"
        >
          Random Date
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Score: {score}</h2>
      </div>
      <div className="mb-4 h-6">
        {feedback && (
          <div className={`font-bold ${feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {feedback.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Timeline:</h2>
        <ul className="space-y-2">
          {!gameOver && (
            <li>
              <button
                onClick={() => handlePlaceEvent(0)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2"
              >
                Place here
              </button>
            </li>
          )}
          {placedEvents.map(renderTimelineItem)}
        </ul>
      </div>
      {currentEvent && !gameOver ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Place this event in the timeline:</h3>
          <div className="p-2 rounded bg-yellow-100">
            {currentEvent.event}
          </div>
        </div>
      ) : gameOver ? (
        <div>
          <div className="text-green-600 font-bold mb-4">
            Game Over! You've placed all events. Final score: {score}/{placedEvents.length}
          </div>
          <button
            onClick={() => resetGame(selectedDate)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Play Again
          </button>
        </div>
      ) : null}
    </section>
  );
}