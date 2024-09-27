import React, { useState, useEffect, useCallback } from 'react';
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
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [recentlyPlacedIndex, setRecentlyPlacedIndex] = useState(null);

    const resetGame = useCallback((date, start, end) => {
        setPlacedEvents([]);
        setCurrentEvent(null);
        setGameOver(false);
        setScore(0);
        setFeedback(null);
        setRecentlyPlacedIndex(null);
        fetchEvents(date, start, end).then(json => {
            setEvents(json);
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
            startGame(json);
        });
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
        resetGame(today, startYear, endYear);
    }, [resetGame, startYear, endYear]);

    useEffect(() => {
        resetGame(selectedDate, startYear, endYear);
    }, [resetGame, selectedDate, startYear, endYear]);

    const fetchEvents = (date, start, end) => {
        const [year, month, day] = date.split('-');
        const startYearParam = start ? `&startYear=${start}` : '';
        const endYearParam = end ? `&endYear=${end}` : '';
        return fetch(`/api/wikiHistoricalEvents?month=${month}&day=${day}${startYearParam}${endYearParam}`)
            .then(response => response.json())
            .catch(error => console.error(error));
    };

    const getRandomDate = () => {
        const start = new Date(2023, 0, 1);
        const end = new Date(2023, 11, 31);
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toISOString().split('T')[0];
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

    const handlePlaceEvent = (guessedIndex) => {
        if (!currentEvent || gameOver) return;

        const newPlacedEvents = [...placedEvents];
        const correctIndex = newPlacedEvents.findIndex(event => event.year > currentEvent.year);
        const actualIndex = correctIndex === -1 ? newPlacedEvents.length : correctIndex;
        const isCorrect = guessedIndex === actualIndex;

        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
            setFeedback({ message: "Correct!", isCorrect: true, event: currentEvent });
        } else {
            setFeedback({
                message: "Incorrect! The event belongs " +
                    (actualIndex < guessedIndex ? "earlier" : "later") + " in the timeline.",
                isCorrect: false,
                event: currentEvent
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
            setRecentlyPlacedIndex(null);
        }, 2000);
    };

    return (
        <section className="flex flex-col h-screen">
            <div className="p-4">
                <DateSelector
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    onRandomDate={() => {
                        const randomDate = getRandomDate();
                        setSelectedDate(randomDate);
                    }}
                    startYear={startYear}
                    endYear={endYear}
                    onStartYearChange={setStartYear}
                    onEndYearChange={setEndYear}
                />
                <ScoreDisplay score={score} />
                <FeedbackDisplay feedback={feedback} />
            </div>

            <div className="flex-grow overflow-y-auto p-4 pb-32">
                <Timeline
                    placedEvents={placedEvents}
                    gameOver={gameOver}
                    onPlaceEvent={handlePlaceEvent}
                    recentlyPlacedIndex={recentlyPlacedIndex}
                />

                {gameOver && (
                    <div className="mt-4">
                        <GameOver
                            score={score}
                            totalEvents={placedEvents.length - 1}
                            onPlayAgain={() => resetGame(selectedDate, startYear, endYear)}
                        />
                    </div>
                )}
            </div>

            {currentEvent && !gameOver && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
                    <CurrentEvent event={currentEvent} />
                </div>
            )}
        </section>
    );
}