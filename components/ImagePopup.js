import React from 'react';

const ImagePopup = ({ imageUrl, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white dark:bg-gray-800 p-2 rounded-lg">
                <img src={imageUrl} alt="Full size" className="max-w-full h-auto" onClick={(e) => e.stopPropagation()} />
            </div>
        </div>
    );
};

export default ImagePopup;