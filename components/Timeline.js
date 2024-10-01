import React, { useState } from 'react';
import TimelineItem from './TimelineItem';
import ImagePopup from './ImagePopup';

export default function Timeline({ placedEvents, gameOver, onPlaceEvent, recentlyPlacedIndex }) {
    const [popupImage, setPopupImage] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

    return (
        <div className="relative">
            <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-gray-300 dark:bg-gray-600 -translate-x-1/2 z-0"></div>
            <div className="text-center py-4 mb-4 relative z-10">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">BEFORE</span>
            </div>
            <div className="grid grid-cols-1 gap-2 relative mb-4">
                {placedEvents.map((event, index) => (
                    <TimelineItem
                        key={event.year + event.event}
                        event={event}
                        index={index}
                        gameOver={gameOver}
                        onPlaceEvent={onPlaceEvent}
                        recentlyPlacedIndex={recentlyPlacedIndex}
                        expandedIndex={expandedIndex}
                        setExpandedIndex={setExpandedIndex}
                        setPopupImage={setPopupImage}
                    />
                ))}
            </div>
            <div className="text-center py-4 mt-4 relative z-10">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">AFTER</span>
            </div>
            {popupImage && (
                <ImagePopup imageUrl={popupImage} onClose={() => setPopupImage(null)} />
            )}
        </div>
    );
}