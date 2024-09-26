import React from 'react';

export default function FeedbackDisplay({ feedback }) {
    if (!feedback) return <div className="mb-4 h-6"></div>;

    return (
        <div className="mb-4 h-6">
            <div className={`font-bold ${feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {feedback.message}
            </div>
        </div>
    );
}