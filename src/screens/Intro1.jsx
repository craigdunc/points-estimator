// src/screens/Intro1.jsx
import React from 'react';

// Changed props: accepting goTo and currentStepIndex instead of goNext
export default function Intro1({ goTo, currentStepIndex }) {
  const handleNext = () => {
    // Go to the next step (Intro2, index 2)
    goTo(currentStepIndex + 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 pt-42 pb-52 relative">
      {/* Settings Cog Icon */}
      <button
        onClick={() => goTo(0)}
        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Settings"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div>
        <h1 className="text-3xl font-medium mb-6">
          Welcome to Qantas Frequent Flyer!
        </h1>
        <p className="mb-6 text-base text-gray-800">
          You’ve just joined a community of Australians who, like you, are finding more value in every journey.
        </p>
      </div>

      <button
        onClick={handleNext} // Use the updated handler
        className="w-full py-3 bg-red-600 font-semibold tracking-widest text-white text-base rounded-sm"
      >
        NEXT
      </button>
    </div>
  );
}