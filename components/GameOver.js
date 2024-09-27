import React from 'react';

export default function GameOver({ score, totalEvents, onPlayAgain }) {
    return (
        <div>
            <div className="text-green-600 font-bold mb-4">
                Game Over! You have placed all events. Final score: {score}/{totalEvents}
            </div>
            <button
                onClick={onPlayAgain}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Play Again
            </button>
        </div>
    );
}