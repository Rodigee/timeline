import React from 'react';

const ScoreDisplay = ({ score, currentItemIndex, totalItems }) => {
    const progressBoxes = Array(totalItems).fill(0).map((_, index) => (
        <div
            key={index}
            className={`w-4 h-4 border border-gray-300 mx-0.5 ${index < currentItemIndex ? 'bg-blue-500' : 'bg-white'
                }`}
        ></div>
    ));

    return (
        <div className="flex justify-between items-center w-full">
            <div>{currentItemIndex} of {totalItems}</div>
            <div className="flex items-center justify-center">
                {progressBoxes}
            </div>
            <div>Score: {score}</div>
        </div>
    );
};

export default ScoreDisplay;