import React from 'react';
import { formatYear } from './Utils';

export default function FeedbackDisplay({ feedback }) {
    if (!feedback) return <div className="mb-4 h-6"></div>;

    return (
        <div className='flex items-center gap-4'>
            <div className="mb-4 h-6">
                <div className={`font-bold ${feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.message} {formatYear(feedback.event.year)}
                </div>
            </div>
            {feedback.event.thumbnail_url && (
                <div className="ml-4 flex-shrink-0">
                    <img
                        src={feedback.event.thumbnail_url}
                        alt="Event thumbnail"
                        className="w-16 h-16 object-cover rounded"
                    />
                </div>
            )}
        </div>
    );
}