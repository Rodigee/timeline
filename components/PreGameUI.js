import React, { useState, useEffect, useCallback } from 'react';
import DateSelector from './DateSelector';

const PreGameUI = ({ onGameStart }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');

    useEffect(() => {
        const today = new Date();
        setSelectedMonth(today.getMonth() + 1);
        setSelectedDay(today.getDate());

        // Load the Trajan Pro font
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Trajan+Pro:wght@400;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const handleDateChange = useCallback((month, day) => {
        setSelectedMonth(month);
        setSelectedDay(day);
    }, []);

    const fetchEvents = useCallback((month, day, start, end) => {
        const startYearParam = start ? `&startYear=${start}` : '';
        const endYearParam = end ? `&endYear=${end}` : '';
        return fetch(`/api/wikiHistoricalEvents?month=${month}&day=${day}${startYearParam}${endYearParam}`)
            .then(response => response.json())
            .catch(error => console.error(error));
    }, []);

    const handleStartGame = useCallback(() => {
        fetchEvents(selectedMonth, selectedDay, startYear, endYear).then(eventsList => {
            if (eventsList.length > 0) {
                onGameStart(eventsList);
            } else {
                console.error('No events found for the selected date range');
                // You might want to show an error message to the user here
            }
        });
    }, [fetchEvents, selectedMonth, selectedDay, startYear, endYear, onGameStart]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-md">
                <h1 className="text-5xl text-center mb-4 text-gray-800 dark:text-white" style={{ fontFamily: "'Trajan Pro', serif", letterSpacing: '0.05em', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                    LOST IN TIME
                </h1>
                <h2 className="text-xl text-center mb-6 text-gray-600 dark:text-gray-300">
                    <strong>Can you place 10 notable events in chronological order?</strong>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
                    Select a date to see events that appeared that day in history.
                </p>
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
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 w-full transition-colors duration-200 text-lg font-semibold"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default PreGameUI;