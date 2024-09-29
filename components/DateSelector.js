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
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="monthPicker" className="block mb-2 text-sm font-medium">Select a month:</label>
                    <select
                        id="monthPicker"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="w-full border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white text-sm"
                    >
                        {months.map((month, index) => (
                            <option key={month} value={index + 1}>{month}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="dayPicker" className="block mb-2 text-sm font-medium">Select a day:</label>
                    <select
                        id="dayPicker"
                        value={selectedDay}
                        onChange={handleDayChange}
                        className="w-full border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white text-sm"
                    >
                        {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                onClick={handleRandomDate}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-200 text-sm"
            >
                Random Date
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startYear" className="block mb-2 text-sm font-medium">Start Year (optional):</label>
                    <input
                        type="number"
                        id="startYear"
                        value={startYear}
                        onChange={(e) => onStartYearChange(e.target.value)}
                        placeholder="e.g. -500 for 500 BCE"
                        className="w-full border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="endYear" className="block mb-2 text-sm font-medium">End Year (optional):</label>
                    <input
                        type="number"
                        id="endYear"
                        value={endYear}
                        onChange={(e) => onEndYearChange(e.target.value)}
                        placeholder="e.g. 2023"
                        className="w-full border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white text-sm"
                    />
                </div>
            </div>
        </div>
    );
}