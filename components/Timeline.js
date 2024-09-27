import React from 'react';
import { formatYear } from './Utils';

export default function Timeline({ placedEvents, gameOver, onPlaceEvent, recentlyPlacedIndex }) {
    const PlaceHereButton = ({ index }) => (
        <button
            onClick={() => onPlaceEvent(index)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm w-full transition-colors"
        >
            Place here
        </button>
    );

    const renderTimelineItem = (event, index) => (
        <React.Fragment key={event.year}>
            {index === 0 && !gameOver && <PlaceHereButton index={0} />}
            <div className={`p-2 rounded ${index === recentlyPlacedIndex
                ? 'bg-yellow-200 dark:bg-yellow-800 font-bold'
                : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                <div className="flex items-center gap-4">
                    <div>
                        <div className="dark:text-white">{formatYear(event.year)}: {event.event}</div>
                        <div className={`text-sm ${event.placementStatus === 'original'
                            ? 'text-gray-600 dark:text-gray-300'
                            : event.placementStatus === 'correct'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                            {event.placementStatus === 'original' ? 'Placed for you' :
                                event.placementStatus === 'correct' ? 'Correct' : 'Wrong'}
                        </div>
                    </div>
                    {event.thumbnail_url && (
                        <img
                            src={event.thumbnail_url}
                            alt="Event thumbnail"
                            className="w-16 h-16 object-cover rounded"
                        />
                    )}
                </div>
            </div>
            {!gameOver && <PlaceHereButton index={index + 1} />}
        </React.Fragment>
    );

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 dark:text-white">Timeline:</h2>
            <div className="grid grid-cols-1 gap-2">
                {placedEvents.map(renderTimelineItem)}
            </div>
        </div>
    );
}