import React from 'react';

export default function ScoreDisplay({ score }) {
    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Score: {score}</h2>
        </div>
    );
}