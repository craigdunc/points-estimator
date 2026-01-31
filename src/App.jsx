// src/App.jsx
import React, { useState } from 'react';
import SlotSelect from './screens/SlotSelect';
import Intro1 from './screens/Intro1';
import Intro2 from './screens/Intro2';
import WTESelection from './screens/WTESelection';
import RewardsScreen from './screens/RewardsScreen'; // Import the new screen
import Dashboard from './screens/Dashboard';
import MonthChange from './components/MonthChange'; // Assuming this acts like a screen

const steps = [
  SlotSelect,    // 0
  Intro1,        // 1
  Intro2,        // 2
  WTESelection,  // 3
  RewardsScreen, // 4 <-- New Screen
  Dashboard,     // 5
  MonthChange,   // 6
];

// Simple helper to get the index of a component in the steps array
const getStepIndex = (Component) => steps.findIndex(step => step === Component);

export default function App() {
  const [stepIndex, setStepIndex] = useState(1);
  const Screen = steps[stepIndex];

  // New navigation function: goes directly to a specific step index
  const goTo = (targetIndex) => {
    if (targetIndex >= 0 && targetIndex < steps.length) {
      setStepIndex(targetIndex);
    } else {
      console.warn(`Attempted to navigate to invalid step index: ${targetIndex}`);
    }
  };

  // Pass the current index and the goTo function to the current screen
  return <Screen currentStepIndex={stepIndex} goTo={goTo} />;
}