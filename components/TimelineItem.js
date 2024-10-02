import React from 'react';
import { useDrag } from 'react-dnd';
import { formatYear } from './Utils';

const TimelineItem = ({
    event,
    index,
    recentlyPlacedIndex,
    expandedIndex,
    setExpandedIndex,
    setPopupImage,
    useDragAndDrop
}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'event',
        item: { id: event.id, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [event, index]);

    const getDateBackgroundColor = () => {
        switch (event.placementStatus) {
            case 'correct':
                return 'bg-green-700 dark:bg-green-700';
            case 'wrong':
                return 'bg-red-500 dark:bg-red-700';
            default:
                return 'bg-gray-400 dark:bg-gray-600';
        }
    };

    return (
        <div
            ref={useDragAndDrop ? drag : null}
            className={`relative my-3 ${useDragAndDrop ? 'cursor-move' : ''} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 z-40 rounded-full text-sm font-bold text-white ${getDateBackgroundColor()}`}>
                {formatYear(event.year)}
            </div>
            <div className={`p-4 rounded ${index === recentlyPlacedIndex
                ? 'bg-yellow-200 dark:bg-yellow-800'
                : 'bg-gray-200 dark:bg-gray-700'
                } relative z-10`}
            >
                <div className="flex items-center gap-4">
                    <div className="flex-grow">
                        <div className={`dark:text-white ${index === recentlyPlacedIndex ? 'font-bold' : ''}`}>
                            {event.event}
                        </div>
                        <div className={`text-sm ${event.placementStatus === 'original'
                            ? 'text-gray-600 dark:text-gray-300'
                            : event.placementStatus === 'correct'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                            {event.placementStatus === 'original' ? 'Placed for you' :
                                event.placementStatus === 'correct' ? 'Correct' : 'Wrong'}
                        </div>
                        {event.extract && (
                            <>
                                <button
                                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                    className="text-blue-500 hover:text-blue-600 mt-2"
                                >
                                    {expandedIndex === index ? 'Hide details' : 'Show details'}
                                </button>
                                {expandedIndex === index && (
                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        {event.extract}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {event.thumbnail_url && (
                        <div className="flex-shrink-0 max-w-[64px] cursor-pointer" onClick={() => setPopupImage(event.thumbnail_url)}>
                            <img
                                src={event.thumbnail_url}
                                alt="Event thumbnail"
                                className="w-full h-auto max-h-16 object-contain rounded"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimelineItem;