import React from 'react';
import { useDrop } from 'react-dnd';

export default function DropZone({ index, onPlaceEvent, isActive }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'event',
        drop: () => onPlaceEvent(index),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [index, onPlaceEvent]);

    if (!isActive) return null;

    return (
        <div
            ref={drop}
            className={`h-24 transition-all duration-200 rounded-md z-10 relative
                border-4 border-dashed ${isOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50'}`}
        >
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">
                    {isOver ? 'Release to place event here' : 'Drop event here'}
                </span>
            </div>
        </div>
    );
}