import React from 'react';

export default function CurrentEvent({ event }) {
    return (
        <div className="mb-4 flex items-start">
            <div className="flex-grow pr-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    Place this event in the timeline:
                </h3>
                <div className="p-2 rounded bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
                    {event.event}
                </div>
            </div>
            {event.thumbnail_url && (
                <div className="flex-shrink-0 max-w-[128px]">
                    <img
                        src={event.thumbnail_url}
                        alt="Event thumbnail"
                        className="w-full h-auto max-h-32 object-contain rounded border border-gray-200 dark:border-gray-700"
                    />
                </div>
            )}
        </div>
    );
}