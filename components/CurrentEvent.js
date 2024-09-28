import React, { useState } from 'react';
import ImagePopup from './ImagePopup'; // Make sure to import the ImagePopup component

export default function CurrentEvent({ event }) {
    const [popupImage, setPopupImage] = useState(null);

    return (
        <div className="mb-4 flex items-start">
            <div className="flex-grow pr-4">
                <div className="p-2 rounded bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
                    {event.event}
                </div>
            </div>
            {event.thumbnail_url && (
                <div
                    className="flex-shrink-0 max-w-[128px] cursor-pointer"
                    onClick={() => setPopupImage(event.thumbnail_url)}
                >
                    <img
                        src={event.thumbnail_url}
                        alt="Event thumbnail"
                        className="w-full h-auto max-h-32 object-contain rounded border border-gray-200 dark:border-gray-700"
                    />
                </div>
            )}
            {popupImage && (
                <ImagePopup imageUrl={popupImage} onClose={() => setPopupImage(null)} />
            )}
        </div>
    );
}