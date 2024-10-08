import React from 'react';
import { useDrag } from 'react-dnd';

export default function CurrentEvent({ event, useDragAndDrop, setPopupImage }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'event',
        item: { id: event.id, event: event },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [event]);

    return (
        <div className="relative">
            <div
                ref={useDragAndDrop ? drag : null}
                className={`p-4 rounded bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 flex items-center
                    ${useDragAndDrop ? 'cursor-move' : ''}
                    transition-opacity duration-200
                    ${isDragging ? 'opacity-0' : 'opacity-100'}`}
            >
                <div className="flex-grow pr-4">
                    {event.event}
                </div>
                {event.thumbnail_url && (
                    <div
                        className="flex-shrink-0 w-32 cursor-pointer"
                        onClick={() => setPopupImage(event.thumbnail_url)}
                    >
                        <img
                            src={event.thumbnail_url}
                            alt="Event thumbnail"
                            className="w-full h-auto max-h-28 object-contain dark:border-gray-700"
                        />
                    </div>
                )}
            </div>
            {useDragAndDrop && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {isDragging ? 'Release to place the event on the timeline' : 'Drag this event to place it on the timeline'}
                </p>
            )}
        </div>
    );
}