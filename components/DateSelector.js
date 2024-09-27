import React from 'react';

export default function DateSelector({ selectedDate, onDateChange, onRandomDate, startYear, endYear, onStartYearChange, onEndYearChange }) {
    return (
        <div className="mb-4 space-y-2">
            <div className="flex items-center space-x-2">
                <div>
                    <label htmlFor="datePicker" className="block mb-2">Select a date:</label>
                    <input
                        type="date"
                        id="datePicker"
                        value={selectedDate}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="border rounded p-2"
                    />
                </div>
                <button
                    onClick={onRandomDate}
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
                        className="border rounded p-2 w-40"
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
                        className="border rounded p-2 w-40"
                    />
                </div>
            </div>
        </div>
    );
}