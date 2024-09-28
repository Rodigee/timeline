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
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [recentlyPlacedIndex, setRecentlyPlacedIndex] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const today = new Date();
        setSelectedMonth(today.getMonth() + 1);
        setSelectedDay(today.getDate());
    }, []);

    const fetchEvents = useCallback((month, day, start, end) => {
        const startYearParam = start ? `&startYear=${start}` : '';
        const endYearParam = end ? `&endYear=${end}` : '';
        return fetch(`/api/wikiHistoricalEvents?month=${month}&day=${day}${startYearParam}${endYearParam}`)
            .then(response => response.json())
            .catch(error => console.error(error));
    }, []);

    const startGame = useCallback((eventsList) => {
        if (eventsList.length > 0) {
            const randomIndex = Math.floor(Math.random() * eventsList.length);
            const firstEvent = eventsList[randomIndex];
            setPlacedEvents([{ ...firstEvent, placementStatus: 'original' }]);
            const remainingEvents = eventsList.filter((_, index) => index !== randomIndex);
            setEvents(remainingEvents);
            setScore(0);
            setTotalItems(eventsList.length - 1);
            setFeedback(null);
            setGameOver(false);
            setRecentlyPlacedIndex(null);
            getNextEvent(remainingEvents);
            setIsGameStarted(true);
        }
    }, []);

    const getNextEvent = useCallback((remainingEvents) => {
        if (remainingEvents.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingEvents.length);
            setCurrentEvent(remainingEvents[randomIndex]);
            setCurrentItemIndex(prevIndex => prevIndex + 1);
            setEvents(remainingEvents.filter((_, index) => index !== randomIndex));
        } else {
            setGameOver(true);
        }
    }, []);

    const resetGame = useCallback(() => {
        setIsGameStarted(false);
        setPlacedEvents([]);
        setCurrentEvent(null);
        setGameOver(false);
        setScore(0);
        setCurrentItemIndex(0);
        setTotalItems(0);
        setFeedback(null);
        setRecentlyPlacedIndex(null);
    }, []);

    const handleStartGame = useCallback(() => {
        fetchEvents(selectedMonth, selectedDay, startYear, endYear).then(json => {
            startGame(json);
        });
    }, [fetchEvents, selectedMonth, selectedDay, startYear, endYear, startGame]);

    const handleDateChange = useCallback((month, day) => {
        setSelectedMonth(month);
        setSelectedDay(day);
    }, []);

    const handlePlaceEvent = useCallback((guessedIndex) => {
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
                message: "Incorrect,",
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
    }, [currentEvent, gameOver, placedEvents, events, getNextEvent]);

    return (
        <section className="flex flex-col h-screen">
            {!isGameStarted ? (
                <div className="p-4">
                    <DateSelector
                        selectedMonth={selectedMonth}
                        selectedDay={selectedDay}
                        onDateChange={handleDateChange}
                        startYear={startYear}
                        endYear={endYear}
                        onStartYearChange={setStartYear}
                        onEndYearChange={setEndYear}
                    />
                    <button
                        onClick={handleStartGame}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Start Game
                    </button>
                </div>
            ) : (
                <>
                    <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 p-4 shadow-md">
                        <ScoreDisplay
                            score={score}
                            currentItemIndex={currentItemIndex}
                            totalItems={totalItems}
                        />
                        <FeedbackDisplay feedback={feedback} />
                        {currentEvent && !gameOver && (
                            <CurrentEvent event={currentEvent} />
                        )}
                        <div className='flex justify-end mt-2'>
                            <button
                                onClick={resetGame}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hidden md:block"
                            >
                                Restart Game
                            </button>
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4">
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
                                    onPlayAgain={resetGame}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </section>
    );
}