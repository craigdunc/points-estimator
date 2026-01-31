// src/screens/Dashboard.jsx
import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import {
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList,
} from '../data';
import OnboardingStepper   from '../components/OnboardingStepper';
import WTETiles            from '../components/WTETiles';
import MonthWrapUpModal    from '../components/MonthWrapUpModal';
// NOTE: We might need these if we dynamically get indices later, but hardcoding for now
// import WTESelection from './WTESelection';
// import MonthChange from '../components/MonthChange';

// Changed props: accepting goTo and currentStepIndex instead of goNext/goBack
export default function Dashboard({ goTo, currentStepIndex }) {
  const { slots, activeSlotId, current } = useSaveSlots();
  if (!activeSlotId || !current) return null;
  const slot = slots.find(s => s.id === activeSlotId);

  const {
    selectedWTEs = [],
    totalAnnualPts = 0,
    selectedWTU,
    selectedRewardId,
    setupProgressByWTE = {},
    currentMonth = new Date().toISOString().slice(0, 7),
    monthlyTargetByWTE = {},
    monthlyEarnedByWTE = {},
    currentPtsBalance = 0
  } = current;

  const [onboardingWteId, setOnboardingWteId] = useState(null);
  const [showWrapUp, setShowWrapUp] = useState(false);
  const [wrapUpData, setWrapUpData] = useState(null);

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];
  const [, mm] = currentMonth.split('-');
  const monthName = monthNames[parseInt(mm, 10) - 1] || currentMonth;

  const memberTier = 'Bronze'; // Example data
  const memberNumber = '1234567890'; // Example data
  const monthlyTarget = totalAnnualPts > 0 ? Math.round(totalAnnualPts / 12) : 0;

  const rewardsMap = {
    Flights: flightsList,
    Hotels: hotelsList,
    Activities: activitiesList,
    Marketplace: marketplaceList,
    'Gift Cards': giftCardsList,
    Entertainment: entertainmentList,
  };
  const selectedReward =
    (rewardsMap[selectedWTU] || []).find(r => r.id === selectedRewardId) || null;

  const handleTimePasses = () => {
    const totalEarned = Object.values(monthlyEarnedByWTE).reduce((a, b) => a + b, 0);
    const totalTarget = Object.values(monthlyTargetByWTE).reduce((a, b) => a + b, 0);

    const metAnyWTE = Object.entries(monthlyTargetByWTE)
      .some(([id, tgt]) => (monthlyEarnedByWTE[id] || 0) >= tgt);
    const metMonth = totalTarget > 0 && totalEarned >= totalTarget; // Ensure target > 0
    const bonusEligible = metMonth || metAnyWTE;

    setWrapUpData({
      monthName,
      totalEarned,
      totalTarget,
      earnedById: monthlyEarnedByWTE,
      targetsById: monthlyTargetByWTE,
      bonusEligible,
    });
    setShowWrapUp(true);
  };

  // --- Navigation Handler Updates ---

  const handleEditWTEs = () => {
      const wteSelectionIndex = 3; // Based on steps in App.jsx
      goTo(wteSelectionIndex);
  };

  const handleSetupOrAddWTE = (id) => {
      if (id === null) {
          // "Add new" was clicked, go back to WTESelection
          const wteSelectionIndex = 3; // Based on steps in App.jsx
          goTo(wteSelectionIndex);
      } else {
          // "Set up" was clicked for a specific WTE
          setOnboardingWteId(id);
      }
  };

  const handleCloseWrapUpModal = () => {
    setShowWrapUp(false);
    // Navigate to the MonthChange screen
    const monthChangeIndex = 6; // Based on steps in App.jsx
    goTo(monthChangeIndex);
  };

  // --- Render ---
  return (
    <>
      {/* --------------- MAIN DASHBOARD -------------------------- */}
      <div className="p-6 space-y-6">
        {/* Header section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{slot?.name || 'Dashboard'}</h1>
            <div className="text-sm text-gray-700">{memberTier}</div>
            <div className="text-xs text-gray-500">{memberNumber}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {currentPtsBalance.toLocaleString()}&nbsp;PTS
            </div>
            <div className="text-sm text-gray-500">
              {currentPtsBalance === 0 ? "Let's get started!" : 'Nice work!'}
            </div>
          </div>
        </div>

        {/* Month Target */}
        <div className="text-center">
          <div className="text-xl font-bold">{monthName}</div>
          {monthlyTarget > 0 && ( // Only show target if calculated
            <div className="mt-2 inline-block rounded-full border border-gray-300 px-6 py-2">
              Target&nbsp;{monthlyTarget.toLocaleString()}&nbsp;PTS
            </div>
          )}
        </div>

        {/* WTE Tiles */}
        <WTETiles
          selectedWTEs={selectedWTEs}
          setupProgressByWTE={setupProgressByWTE}
          monthlyEarnedByWTE={monthlyEarnedByWTE}
          monthlyTargetByWTE={monthlyTargetByWTE}
          onSetupClick={handleSetupOrAddWTE} // Updated handler
        />

        {/* Annual Target / Edit Link */}
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-700">
            Target Annual Earn:&nbsp;{totalAnnualPts.toLocaleString()}&nbsp;PTS
          </div>
          {/* Updated onClick handler */}
          <button onClick={handleEditWTEs} className="text-sm text-gray-700 underline">
            Edit
          </button>
        </div>

        {/* Selected Reward Display */}
        {selectedReward && (
          <div className="mx-2 rounded border p-4">
            {/* Use selectedReward.type if available, otherwise default */}
            <div className="font-semibold">{selectedReward.type || 'Selected Reward'}</div>
            <div className="mt-2 flex items-center justify-between text-lg font-bold">
              <div>{selectedReward.reward}</div>
              <div className="flex items-baseline"> {/* Use flex for points */}
                  {selectedReward.costAUD && <span className="text-xs text-gray-600 mr-1">+ ${selectedReward.costAUD.toFixed(2)}</span>}
                  <span className="mr-0.5">{selectedReward.pts.toLocaleString()}</span>
                  <span className="text-xs uppercase">PTS</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {selectedReward.type === 'Classic Flight Reward'
                ? 'Learn more about Classic Flight Rewards and availability. Taxes, fees and charges apply.'
                : 'Reward details and conditions apply.'} {/* Generic fallback */}
            </div>
          </div>
        )}

        {/* Time Passes Button */}
        <div className="mt-6">
          <button
            onClick={handleTimePasses}
            className="w-full rounded-full py-3 font-semibold tracking-widest text-gray-600 hover:bg-gray-100 border" // Added subtle style
          >
            Time&nbsp;passes…
          </button>
        </div>
      </div>

      {/* --------------- MODALS --------------------------- */}
      {showWrapUp && wrapUpData && (
        <MonthWrapUpModal data={wrapUpData} onClose={handleCloseWrapUpModal} /> // Updated handler
      )}

      {onboardingWteId !== null && (
        <OnboardingStepper
          wteId={onboardingWteId}
          onDone={() => setOnboardingWteId(null)}
        />
      )}
    </>
  );
}