import React from 'react';

export default function DateSelector({ selectedDate, onDateChange, onRandomDate }) {
    return (
        <div className="mb-4 flex items-center space-x-2">
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
    );
}