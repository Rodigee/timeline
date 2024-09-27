import React, { useCallback, useMemo } from 'react';

export default function DateSelector({ selectedMonth, selectedDay, onDateChange, startYear, endYear, onStartYearChange, onEndYearChange }) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = useCallback((month) => {
        const thirtyOneDayMonths = [1, 3, 5, 7, 8, 10, 12];
        const thirtyDayMonths = [4, 6, 9, 11];

        if (thirtyOneDayMonths.includes(month)) return 31;
        if (thirtyDayMonths.includes(month)) return 30;

        // February, always including the 29th
        return 29;
    }, []);

    const days = useMemo(() => {
        const daysInMonth = getDaysInMonth(selectedMonth);
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }, [selectedMonth, getDaysInMonth]);

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value);
        const maxDay = getDaysInMonth(newMonth);
        const newDay = selectedDay > maxDay ? maxDay : selectedDay;
        onDateChange(newMonth, newDay);
    };

    const handleDayChange = (e) => {
        onDateChange(selectedMonth, parseInt(e.target.value));
    };

    const getRandomDate = useCallback(() => {
        const randomMonth = Math.floor(Math.random() * 12) + 1;
        const maxDay = getDaysInMonth(randomMonth);
        const randomDay = Math.floor(Math.random() * maxDay) + 1;
        return [randomMonth, randomDay];
    }, [getDaysInMonth]);

    const handleRandomDate = useCallback(() => {
        const [randomMonth, randomDay] = getRandomDate();
        onDateChange(randomMonth, randomDay);
    }, [getRandomDate, onDateChange]);

    return (
        <div className="mb-4 space-y-2">
            <div className="flex items-center space-x-2">
                <div>
                    <label htmlFor="monthPicker" className="block mb-2">Select a month:</label>
                    <select
                        id="monthPicker"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    >
                        {months.map((month, index) => (
                            <option key={month} value={index + 1}>{month}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="dayPicker" className="block mb-2">Select a day:</label>
                    <select
                        id="dayPicker"
                        value={selectedDay}
                        onChange={handleDayChange}
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    >
                        {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleRandomDate}
                    className="bg-green-600 text-white px-4 py-2 rounded mt-6"
                >
                    Random Date
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <div>
                    <label htmlFor="startYear" className="block mb-2">Start Year (optional):</label>
                    <input
                        type="number"
                        id="startYear"
                        value={startYear}
                        onChange={(e) => onStartYearChange(e.target.value)}
                        placeholder="e.g. -500 for 500 BCE"
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="endYear" className="block mb-2">End Year (optional):</label>
                    <input
                        type="number"
                        id="endYear"
                        value={endYear}
                        onChange={(e) => onEndYearChange(e.target.value)}
                        placeholder="e.g. 2023"
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                </div>
            </div>
        </div>
    );
}