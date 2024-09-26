import React, { useState, useEffect } from 'react';

export default function TimelineGame() {
  const [events, setEvents] = useState([]);
  const [placedEvents, setPlacedEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [comparisonEvent, setComparisonEvent] = useState(null);
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
      setEvents(eventsList.filter((_, index) => index !== randomIndex));
      setScore(0);
      setFeedback(null);
      setRecentlyPlacedIndex(null);
    }
  };

  const getNextEvent = () => {
    if (events.length > 0) {
      const randomIndex = Math.floor(Math.random() * events.length);
      setCurrentEvent(events[randomIndex]);
      setEvents(events.filter((_, index) => index !== randomIndex));

      // Select a random comparison event from placed events
      const randomPlacedIndex = Math.floor(Math.random() * placedEvents.length);
      setComparisonEvent(placedEvents[randomPlacedIndex]);
      setRecentlyPlacedIndex(null);
    } else {
      setGameOver(true);
    }
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    fetchEvents(newDate);
    setGameOver(false);
    setPlacedEvents([]);
    setCurrentEvent(null);
    setComparisonEvent(null);
    setScore(0);
    setFeedback(null);
    setRecentlyPlacedIndex(null);
  };

  const handleGuess = (isBefore) => {
    if (!currentEvent || !comparisonEvent) return;

    const isCorrect = isBefore
      ? currentEvent.year < comparisonEvent.year
      : currentEvent.year > comparisonEvent.year;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback({ message: "Correct!", isCorrect: true });
    } else {
      setFeedback({ message: "Incorrect!", isCorrect: false });
    }

    const newPlacedEvents = [...placedEvents];
    const insertIndex = newPlacedEvents.findIndex(event =>
      isBefore ? event.year > currentEvent.year : event.year >= currentEvent.year
    );

    if (insertIndex === -1) {
      newPlacedEvents.push(currentEvent);
      setRecentlyPlacedIndex(newPlacedEvents.length - 1);
    } else {
      newPlacedEvents.splice(insertIndex, 0, currentEvent);
      setRecentlyPlacedIndex(insertIndex);
    }

    setPlacedEvents(newPlacedEvents);

    // Keep the current event visible during the feedback period
    setTimeout(() => {
      setCurrentEvent(null);
      setComparisonEvent(null);
      setFeedback(null);
      setRecentlyPlacedIndex(null);
    }, 1500);
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    fetchEvents(today);
  }, []);

  useEffect(() => {
    if (placedEvents.length > 0 && !currentEvent && !gameOver && !feedback) {
      getNextEvent();
    }
  }, [placedEvents, currentEvent, gameOver, feedback]);

  return (
    <section className="p-4">
      <div className="mb-4">
        <label htmlFor="datePicker" className="block mb-2">Select a date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Score: {score}</h2>
      </div>
      <div className="mb-4 h-6"> {/* Reserve space for feedback */}
        {feedback && (
          <div className={`font-bold ${feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {feedback.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Timeline:</h2>
        <ul className="space-y-2">
          {placedEvents.map((event, index) => (
            <li
              key={index}
              className={`p-2 rounded ${index === recentlyPlacedIndex
                ? 'bg-yellow-200 font-bold'
                : 'bg-gray-100'
                }`}
            >
              {event.year}: {event.event}
            </li>
          ))}
        </ul>
      </div>
      {(currentEvent && comparisonEvent && !gameOver) ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Place this event:</h3>
          <p className="mb-2">{currentEvent.event}</p>
          <p className="mb-2">Compared to:</p>
          <p className="mb-2 font-bold">{comparisonEvent.year}: {comparisonEvent.event}</p>
          <div className="space-x-2">
            <button onClick={() => handleGuess(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Before
            </button>
            <button onClick={() => handleGuess(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
              After
            </button>
          </div>
        </div>
      ) : gameOver ? (
        <div className="text-green-600 font-bold">
          Game Over! You've placed all events. Final score: {score}/{events.length + placedEvents.length - 1}
        </div>
      ) : null}
    </section>
  );
}