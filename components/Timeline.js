import React, { useState } from 'react';
import TimelineItem from './TimelineItem';
import ImagePopup from './ImagePopup';
import DropZone from './DropZone';

export default function Timeline({ placedEvents, gameOver, onPlaceEvent, recentlyPlacedIndex, useDragAndDrop }) {
    const [popupImage, setPopupImage] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

    return (
        <div className="relative">
            <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-gray-300 dark:bg-gray-600 -translate-x-1/2 z-0"></div>
            <div className="text-center py-4 mb-4 relative z-10">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">BEFORE</span>
            </div>
            <div className="grid grid-cols-1 gap-2 relative mb-4">
                {!gameOver && <DropZone index={0} onPlaceEvent={onPlaceEvent} useDragAndDrop={useDragAndDrop} />}
                {placedEvents.map((event, index) => (
                    <React.Fragment key={event.year + event.event}>
                        <TimelineItem
                            event={event}
                            index={index}
                            recentlyPlacedIndex={recentlyPlacedIndex}
                            expandedIndex={expandedIndex}
                            setExpandedIndex={setExpandedIndex}
                            setPopupImage={setPopupImage}
                            useDragAndDrop={useDragAndDrop}
                        />
                        {!gameOver && <DropZone index={index + 1} onPlaceEvent={onPlaceEvent} useDragAndDrop={useDragAndDrop} />}
                    </React.Fragment>
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