// src/screens/Intro2.jsx
import React from 'react';
import explainerSvg from '../assets/explainer.svg';

/**
 * Intro2
 * Props:
 * - goTo(stepIndex: number): jumps to the given step
 * - currentStepIndex: the index of this screen
 * - dashboardStepIndex (optional): index of the dashboard step
 */
export default function Intro2({ goTo, currentStepIndex, dashboardStepIndex = 5 }) {
  // If your dashboard is at a different index, override dashboardStepIndex when rendering
  const handleShowMe = () => goTo(currentStepIndex + 1);  // go to next (WTESelection)
  const handleSkip   = () => goTo(dashboardStepIndex);  // skip to dashboard

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 pt-20 pb-52">
      <div>
        <h1 className="text-3xl font-medium mb-6">
          Let’s get you some points
        </h1>
        <p className="mb-6 text-base text-gray-800">
          One of the <b>best ways</b> to get the most out of your membership is by finding a few <b>different ways</b> of earning points.<br/><br/>You can add some to your dashboard to help get you started.
        </p>
        <img
          src={explainerSvg}
          alt="How it works"
          className="w-full mb-12 object-contain"
        />
      </div>

      {/* Primary action button goes to next step (WTESelection) */}
      <button
        onClick={handleShowMe}
        className="w-full py-3 bg-red-600 font-semibold tracking-widest text-white text-base rounded-sm"
      >
        SHOW ME
      </button>

      {/* Skip link beneath button jumps to dashboard (stepIndex dashboardStepIndex) */}
      <div className="text-center mt-8">
        <button
          onClick={handleSkip}
          className="text-base text-gray-600 underline hover:text-gray-800"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
