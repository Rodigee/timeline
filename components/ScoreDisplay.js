import React from 'react';

export default function ScoreDisplay({ score, currentItemIndex, totalItems }) {
    const progressBoxes = Array(totalItems).fill(0).map((_, index) => (
        <div
            key={index}
            className={`w-4 h-4 border border-gray-300 mx-0.5 ${index < currentItemIndex ? 'bg-blue-500' : 'bg-white'
                }`}
        ></div>
    ));

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <div className="text-xl font-bold">
                    {currentItemIndex} of {totalItems}
                </div>
                <div className="flex justify-center items-center">
                    {progressBoxes}
                </div>
                <div className="text-xl font-bold">Score: {score}</div>
            </div>
        </div>
    );
}