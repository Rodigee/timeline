import React, { useState } from 'react';
import ImagePopup from './ImagePopup';

export default function CurrentEvent({ event }) {
    const [popupImage, setPopupImage] = useState(null);

    return (
        <div>
            <div className="p-4 rounded bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 flex items-center">
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
                            className="w-full h-auto max-h-28 object-contain  dark:border-gray-700"
                        />
                    </div>
                )}
            </div>
            {popupImage && (
                <ImagePopup imageUrl={popupImage} onClose={() => setPopupImage(null)} />
            )}
        </div>
    );
}