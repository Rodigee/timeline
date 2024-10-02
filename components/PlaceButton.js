import React from 'react';

export default function PlaceButton({ onPlaceEvent, index }) {
    return (
        <button
            onClick={() => onPlaceEvent(index)}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-md transition-colors duration-200"
        >
            Place event here
        </button>
    );
}