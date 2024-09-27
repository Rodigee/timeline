import React from 'react';

export default function CurrentEvent({ event }) {
    return (
        <div className="mb-4 flex items-start">
            <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    Place this event in the timeline:
                </h3>
                <div className="p-2 rounded bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
                    {event.event}
                </div>
            </div>
            {event.thumbnail_url && (
                <div className="ml-4 flex-shrink-0">
                    <img
                        src={event.thumbnail_url}
                        alt="Event thumbnail"
                        className="w-32 h-32 object-cover rounded border border-gray-200 dark:border-gray-700"
                    />
                </div>
            )}
        </div>
    );
}