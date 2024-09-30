import React from 'react';

const YearRangeSelector = ({ startYear, endYear, onStartYearChange, onEndYearChange }) => {
    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                You can specify a year range to focus on a particular era.
            </p>
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
};

export default YearRangeSelector;