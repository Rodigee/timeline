// TimelineGame.js
import React, { useState, useEffect } from 'react';
import DateSelector from './DateSelector';
import ScoreDisplay from './ScoreDisplay';
import FeedbackDisplay from './FeedbackDisplay';
import CurrentEvent from './CurrentEvent';
import GameOver from './GameOver';
import Timeline from './Timeline';

export default function TimelineGame() {
    const [events, setEvents] = useState([]);
    const [placedEvents, setPlacedEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [recentlyPlacedIndex, setRecentlyPlacedIndex] = useState(null);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
        resetGame(today);
    }, []);

    const fetchEvents = (date) => {
        const [year, month, day] = date.split('-');
        return fetch(`/api/wikiHistoricalEvents?month=${month}&day=${day}`)
            .then(response => response.json())
            .catch(error => console.error(error));
    };

    const getRandomDate = () => {
        const start = new Date(2023, 0, 1);
        const end = new Date(2023, 11, 31);
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toISOString().split('T')[0];
    };

    const startGame = (eventsList) => {
        if (eventsList.length > 0) {
            const randomIndex = Math.floor(Math.random() * eventsList.length);
            const firstEvent = eventsList[randomIndex];
            setPlacedEvents([{ ...firstEvent, placementStatus: 'original' }]);
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

    const resetGame = (date) => {
        setPlacedEvents([]);
        setCurrentEvent(null);
        setGameOver(false);
        setScore(0);
        setFeedback(null);
        setRecentlyPlacedIndex(null);
        fetchEvents(date).then(json => {
            setEvents(json);
            startGame(json);
        });
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

        newPlacedEvents.splice(actualIndex, 0, { ...currentEvent, placementStatus: isCorrect ? 'correct' : 'wrong' });
        setPlacedEvents(newPlacedEvents);
        setRecentlyPlacedIndex(actualIndex);

        if (events.length > 0) {
            getNextEvent(events);
        } else {
            setCurrentEvent(null);
            setGameOver(true);
        }

        setTimeout(() => {
            setFeedback(null);
            setRecentlyPlacedIndex(null);
        }, 2000);
    };

    return (
        <section className="p-4">
            <DateSelector
                selectedDate={selectedDate}
                onDateChange={(newDate) => {
                    setSelectedDate(newDate);
                    resetGame(newDate);
                }}
                onRandomDate={() => {
                    const randomDate = getRandomDate();
                    setSelectedDate(randomDate);
                    resetGame(randomDate);
                }}
            />
            <ScoreDisplay score={score} />
            <FeedbackDisplay feedback={feedback} />
            {currentEvent && !gameOver ? (
                <CurrentEvent event={currentEvent} />
            ) : gameOver ? (
                <GameOver score={score} totalEvents={placedEvents.length - 1} onPlayAgain={() => resetGame(selectedDate)} />
            ) : null}
            <Timeline
                placedEvents={placedEvents}
                gameOver={gameOver}
                onPlaceEvent={handlePlaceEvent}
                recentlyPlacedIndex={recentlyPlacedIndex}
            />
        </section>
    );
}