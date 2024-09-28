import React from 'react';

const ScoreDisplay = ({ score, currentRound, gameOver, totalRounds, answerHistory }) => {
    const progressBoxes = Array(totalRounds).fill(0).map((_, index) => {
        let bgColor = 'bg-white';
        if (index < currentRound - 1 || gameOver) {
            bgColor = answerHistory[index] ? 'bg-green-500' : 'bg-red-500';
        }
        return (
            <div
                key={index}
                className={`w-4 h-4 border border-gray-300 mx-0.5 ${bgColor}`}
            ></div>
        );
    });

    return (
        <div className="flex justify-between items-center w-full">
            <div className={gameOver ? 'invisible' : 'visible'}>
                {currentRound} of {totalRounds}
            </div>
            <div className="flex items-center justify-center">
                {progressBoxes}
            </div>
            <div>Score: {score}</div>
        </div>
    );
};

export default ScoreDisplay;