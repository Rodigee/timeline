import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import ImagePopup from './ImagePopup';

export default function CurrentEvent({ event, useDragAndDrop }) {
    const [popupImage, setPopupImage] = useState(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'event',
        item: { id: event.id, event: event },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [event]);

    return (
        <div>
            <div
                ref={useDragAndDrop ? drag : null}
                className={`p-4 rounded bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 flex items-center
                    ${useDragAndDrop ? 'cursor-move' : ''}
                    ${isDragging ? 'opacity-50' : 'opacity-100'}`}
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
            {popupImage && (
                <ImagePopup imageUrl={popupImage} onClose={() => setPopupImage(null)} />
            )}
            {useDragAndDrop && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Drag this event to place it on the timeline
                </p>
            )}
        </div>
    );
}