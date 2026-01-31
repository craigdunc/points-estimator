// components/ModalShell.jsx
import React from 'react';

export default function ModalShell({ children, onClickOutside }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      onClick={onClickOutside}
    >
      <div
        className="bg-white max-w-md w-full mx-4 rounded-lg p-6 space-y-6 shadow-xl"
        onClick={e => e.stopPropagation()} // prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
}
