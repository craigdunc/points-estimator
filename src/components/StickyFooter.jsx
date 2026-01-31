import React, { useState, useEffect } from 'react';
import PointsRooLogo from '../assets/points-roo.svg';
import RewardCard from './RewardCard';

export default function StickyFooter({
  totalPts,
  selectedReward,
  hasSelectedReward,
  onAddToDashboard,
  onSeeMoreClick,
}) {
  const [shouldRender, setShouldRender] = useState(totalPts > 0 || !!selectedReward);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeoutId;
    const conditionToShow = totalPts > 0 || !!selectedReward;

    if (conditionToShow) {
      if (!shouldRender) setShouldRender(true);
      requestAnimationFrame(() => {
        if (!mounted) setMounted(true);
      });
    } else {
      if (mounted) setMounted(false);
      timeoutId = setTimeout(() => {
        if (shouldRender) setShouldRender(false);
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [totalPts, selectedReward, shouldRender, mounted]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 bg-white
        rounded-t-[28px] overflow-hidden z-30
        transform transition-transform duration-500 ease-out
        ${mounted ? 'translate-y-0' : 'translate-y-full'}
      `}
      style={{ boxShadow: '0 -20px 20px -10px rgba(0,0,0,0.1)' }}
    >
      {/* Estimated Points Summary */}
      <div className="pt-6 pb-2 px-6">
        <div className="flex justify-center items-center space-x-1.5 flex-wrap">
          <span className="text-[13px] font-medium text-gray-700">Est</span>
          <img src={PointsRooLogo} alt="" className="w-5 h-5" />
          <span className="text-xl font-black text-gray-900 leading-none">
            {totalPts ? totalPts.toLocaleString() : '0'}
          </span>
          <span className="text-[10px] font-bold text-gray-500 pt-1">PTS</span>
          <span className="text-[13px] text-gray-600 font-medium pt-0.5 ml-1">/year from selected</span>
        </div>
      </div>

      {/* Reward Section */}
      <div className="px-6 pb-2">
        <div className="flex justify-between items-center mb-3 mt-1">
          <h3 className="text-base font-bold text-gray-900">
            {hasSelectedReward ? 'Selected Reward' : 'Example Reward'}
          </h3>
          <button
            onClick={onSeeMoreClick}
            className="text-sm font-bold text-red-600 underline underline-offset-4 hover:text-red-700 transition-colors"
          >
            See more
          </button>
        </div>

        {selectedReward ? (
          <RewardCard reward={selectedReward} />
        ) : (
          <div className="p-8 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 text-center flex flex-col items-center justify-center space-y-2">
            <p className="text-sm font-medium">Select more ways to earn to unlock rewards.</p>
          </div>
        )}
      </div>

      {/* Primary Action */}
      <div className="p-6">
        <button
          className="w-full py-4 bg-red-600 font-black tracking-[0.1em] text-white text-base rounded-lg shadow-lg active:scale-[0.98] transition-all disabled:grayscale disabled:opacity-50"
          onClick={onAddToDashboard}
          disabled={!selectedReward}
        >
          ADD TO DASHBOARD
        </button>
      </div>
    </div>
  );
}