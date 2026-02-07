// src/components/CitySelectionModal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const CITIES = [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Hobart',
    'Canberra',
    'Darwin',
    'Gold Coast'
];

export default function CitySelectionModal({ isOpen, onClose, currentCity, onSelectCity }) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-semibold text-gray-900">Select Origin City</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {CITIES.map(city => (
                        <button
                            key={city}
                            onClick={() => {
                                onSelectCity(city);
                                onClose();
                            }}
                            className={`w-full px-6 py-4 text-left text-base transition-colors border-b border-gray-100 last:border-0 hover:bg-gray-50
                ${currentCity === city ? 'font-bold text-red-600 bg-red-50' : 'text-gray-700 font-medium'}`}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                <div className="p-4 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gray-200 text-gray-700 text-sm font-semibold tracking-widest rounded-sm transition-colors uppercase hover:bg-gray-300"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
