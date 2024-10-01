import React from 'react';

const Snackbar = ({ open, message, isCorrect }) => {
    if (!open) return null;

    const bgColor = isCorrect ? 'bg-green-700' : 'bg-red-500';

    return (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50`}>
            {message}
        </div>
    );
};

export default Snackbar;