import React from 'react';

const ScoreDisplay = ({ score, currentRound, gameOver, totalRounds, answerHistory, onRestartGame }) => {
    const progressBoxes = Array(totalRounds).fill(0).map((_, index) => {
        let bgColor = 'bg-white';
        let borderColor = 'border-gray-300';
        if (index < currentRound - 1 || gameOver) {
            bgColor = answerHistory[index] ? 'bg-green-500' : 'bg-red-500';
        }
        else if (index === currentRound - 1) {
            borderColor = 'border-black';
        }
        return (
            <div
                key={index}
                className={`w-4 h-4 border mx-0.5 ${bgColor} ${borderColor}`}
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
            <div className="flex items-center">
                <div className="mr-4">Score: {score}</div>
                <button
                    onClick={onRestartGame}
                    className="bg-blue-500 text-white px-2 py-1 rounded hidden md:block"
                >
                    Restart Game
                </button>
            </div>
        </div>
    );
};

export default ScoreDisplay;