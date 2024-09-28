import React, { useState, useCallback } from 'react';
import ScoreDisplay from './ScoreDisplay';
import CurrentEvent from './CurrentEvent';
import GameOver from './GameOver';
import Timeline from './Timeline';
import Snackbar from './Snackbar';
import PreGameUI from './PreGameUI';

export default function TimelineGame() {
    const [events, setEvents] = useState([]);
    const [placedEvents, setPlacedEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', isCorrect: false });
    const [recentlyPlacedIndex, setRecentlyPlacedIndex] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [totalRounds, setTotalRounds] = useState(0);
    const [answerHistory, setAnswerHistory] = useState([]);

    const startGame = useCallback((eventsList) => {
        if (eventsList.length > 0) {
            const randomIndex = Math.floor(Math.random() * eventsList.length);
            const firstEvent = eventsList[randomIndex];
            setPlacedEvents([{ ...firstEvent, placementStatus: 'original' }]);
            const remainingEvents = eventsList.filter((_, index) => index !== randomIndex);
            setEvents(remainingEvents);
            setScore(0);
            setTotalRounds(remainingEvents.length);
            setGameOver(false);
            setRecentlyPlacedIndex(null);
            setAnswerHistory([]);
            setCurrentRound(0);
            getNextEvent(remainingEvents);
            setIsGameStarted(true);
        }
    }, []);

    const getNextEvent = useCallback((remainingEvents) => {
        if (remainingEvents.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingEvents.length);
            setCurrentEvent(remainingEvents[randomIndex]);
            setCurrentRound(prevRound => prevRound + 1);
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
        setCurrentRound(0);
        setTotalRounds(0);
        setRecentlyPlacedIndex(null);
        setAnswerHistory([]);
    }, []);

    const handlePlaceEvent = useCallback((guessedIndex) => {
        if (!currentEvent || gameOver) return;

        const newPlacedEvents = [...placedEvents];
        const correctIndex = newPlacedEvents.findIndex(event => event.year > currentEvent.year);
        const actualIndex = correctIndex === -1 ? newPlacedEvents.length : correctIndex;
        const isCorrect = guessedIndex === actualIndex;

        setAnswerHistory(prev => [...prev, isCorrect]);

        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
            setSnackbar({
                open: true,
                message: `Correct! The correct year was ${currentEvent.year}.`,
                isCorrect: true
            });
        } else {
            setSnackbar({
                open: true,
                message: `Incorrect. The correct year was ${currentEvent.year}`,
                isCorrect: false
            });
        }

        newPlacedEvents.splice(actualIndex, 0, { ...currentEvent, placementStatus: isCorrect ? 'correct' : 'wrong' });
        setPlacedEvents(newPlacedEvents);
        setRecentlyPlacedIndex(actualIndex);

        if (currentRound < totalRounds) {
            getNextEvent(events);
        } else {
            setCurrentEvent(null);
            setGameOver(true);
        }

        setTimeout(() => {
            setRecentlyPlacedIndex(null);
            setSnackbar(prev => ({ ...prev, open: false }));
        }, 3000);
    }, [currentEvent, gameOver, placedEvents, events, getNextEvent, currentRound, totalRounds]);

    return (
        <section className="flex flex-col h-screen">
            {!isGameStarted ? (
                <PreGameUI onGameStart={startGame} />
            ) : (
                <>
                    <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 p-4 shadow-md flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            {!gameOver && (
                                <ScoreDisplay
                                    score={score}
                                    currentRound={currentRound}
                                    gameOver={gameOver}
                                    totalRounds={totalRounds}
                                    answerHistory={answerHistory}
                                    onRestartGame={resetGame}
                                />
                            )}
                            {gameOver && (
                                <GameOver
                                    score={score}
                                    totalEvents={placedEvents.length - 1}
                                    onPlayAgain={resetGame}
                                />
                            )}
                        </div>
                        {currentEvent && !gameOver && (
                            <CurrentEvent event={currentEvent} />
                        )}
                    </div>

                    <div className="flex-grow overflow-y-auto p-4">
                        <Timeline
                            placedEvents={placedEvents}
                            gameOver={gameOver}
                            onPlaceEvent={handlePlaceEvent}
                            recentlyPlacedIndex={recentlyPlacedIndex}
                        />
                    </div>
                </>
            )}
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                isCorrect={snackbar.isCorrect}
            />
        </section>
    );
}