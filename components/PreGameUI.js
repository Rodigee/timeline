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
                // Handle case when no events are returned
                console.error('No events found for the selected date range');
                // You might want to show an error message to the user here
            }
        });
    }, [fetchEvents, selectedMonth, selectedDay, startYear, endYear, onGameStart]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
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
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default PreGameUI;