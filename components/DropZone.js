import React from 'react';
import { useDrop } from 'react-dnd';

export default function DropZone({ index, onPlaceEvent, useDragAndDrop }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'event',
        drop: () => onPlaceEvent(index),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [index, onPlaceEvent]);

    return (
        <div
            ref={drop}
            className={`h-8 ${isOver ? 'bg-blue-200' : 'bg-transparent'} transition-colors duration-200 rounded-md`}
        >
            {!useDragAndDrop && (
                <button
                    onClick={() => onPlaceEvent(index)}
                    className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors duration-200"
                >
                    Place here
                </button>
            )}
        </div>
    );
}