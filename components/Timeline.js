import React, { useState } from 'react';
import { useDragLayer } from 'react-dnd';
import TimelineItem from './TimelineItem';
import DropZone from './DropZone';
import PlaceButton from './PlaceButton';

export default function Timeline({ placedEvents, gameOver, onPlaceEvent, recentlyPlacedIndex, useDragAndDrop, setPopupImage }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const { isDragging } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
    }));

    const renderPlacementElement = (index) => {
        if (useDragAndDrop) {
            return (
                <DropZone
                    index={index}
                    onPlaceEvent={onPlaceEvent}
                    isActive={isDragging}
                />
            );
        } else {
            return <PlaceButton onPlaceEvent={onPlaceEvent} index={index} />;
        }
    };

    return (
        <div className="relative">
            <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-gray-300 dark:bg-gray-600 -translate-x-1/2 z-0"></div>
            <div className="text-center py-4 mb-4 relative z-10">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">BEFORE</span>
            </div>
            <div className="grid grid-cols-1 gap-2 relative mb-4">
                {!gameOver && renderPlacementElement(0)}
                {placedEvents.map((event, index) => (
                    <React.Fragment key={event.year + event.event}>
                        <TimelineItem
                            event={event}
                            index={index}
                            gameOver={gameOver}
                            onPlaceEvent={onPlaceEvent}
                            recentlyPlacedIndex={recentlyPlacedIndex}
                            expandedIndex={expandedIndex}
                            setExpandedIndex={setExpandedIndex}
                            setPopupImage={setPopupImage}
                            useDragAndDrop={useDragAndDrop}
                        />
                        {!gameOver && renderPlacementElement(index + 1)}
                    </React.Fragment>
                ))}
            </div>
            <div className="text-center py-4 mt-4 relative z-10">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">AFTER</span>
            </div>
        </div>
    );
}