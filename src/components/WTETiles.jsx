// src/components/WTETiles.jsx
import React from 'react';
import { WTEs } from '../data';

export default function WTETiles({
  selectedWTEs,
  setupProgressByWTE,
  monthlyEarnedByWTE,
  monthlyTargetByWTE,
  onSetupClick,
}) {
  console.log('[WTETiles] Rendering with selectedWTEs:', selectedWTEs); // Log the incoming prop

  return (
    <div className="grid grid-cols-3 gap-6 justify-items-center">
      {selectedWTEs.map(({ id: stringId }) => { // Rename id to stringId for clarity
        // --- Convert ID and find WTE data ---
        const numericId = Number(stringId);

        // Add checks for valid ID conversion
        if (isNaN(numericId)) {
          console.warn(`[WTETiles] Invalid numericId from stringId: ${stringId}`);
          return null; // Skip rendering for invalid IDs
        }

        const wte = WTEs.find(w => w.id === numericId);
        if (!wte) {
            console.warn(`[WTETiles] WTE details not found for ID: ${numericId} (from string ${stringId})`);
            return null; // Skip rendering if WTE details aren't found
        }

        // --- Look up state data using NUMERIC ID consistently ---
        // Assuming the keys in these maps might be numbers from WTESelection
        const setupSteps = setupProgressByWTE?.[numericId] ?? setupProgressByWTE?.[stringId] ?? 0; // Check both just in case setup uses strings
        const earned     = monthlyEarnedByWTE?.[numericId] ?? 0;
        const target     = monthlyTargetByWTE?.[numericId] ?? 1; // avoid /0

        const percent    = earned > 0 && target > 0
          ? Math.min((earned / target) * 100, 100)
          : setupSteps > 0 ? (setupSteps / 4) * 100 : 0; // Assuming 4 setup steps max, default to 0% if no earned/setup

        // --- Log before rendering ---
        console.log(`[WTETiles] Preparing tile for ${wte.name} (ID: ${numericId}, StringID: ${stringId})`, {
            earned, target, setupSteps, percent
        });

        /* ───────────────────── tile ───────────────────── */
        return (
          // Use the unique numericId as the key
          <div key={numericId} className="flex flex-col items-center w-full"> {/* Ensure full width for item */}
            {/* WTE name (2-line clamp) */}
            <div
              className="text-xs h-8 font-medium mb-1 text-center overflow-hidden flex items-center justify-center" // Use flex to center vertically
              style={{ /* Removed webkit clamp for now, rely on h-8 and overflow hidden */ }}
            >
              {wte.name}
            </div>

            {/* progress ring w/ icon */}
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle cx="18" cy="18" r="16" stroke="#e5e7eb" strokeWidth="2" fill="none"/>
                <circle
                  cx="18" cy="18" r="16"
                  stroke="#dc2626" strokeWidth="2" fill="none"
                  strokeDasharray={`${percent} 100`}
                  transform="rotate(-90 18 18)" // Correct rotation start point
                  style={{ transition: 'stroke-dasharray 0.3s ease' }} // Add transition
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={wte.iconSrc}
                  alt={`${wte.name} logo`}
                  className="w-11 h-11 object-contain"
                />
              </div>
            </div>

            {/* Earned number OR setup button */}
            {earned > 0 ? (
              <div className="flex items-end mt-2">
                <span className="font-bold text-lg leading-none">{earned.toLocaleString()}</span>
                <span className="font-normal text-sm leading-none ml-1">PTS</span>
              </div>
            ) : (
              <>
                <button
                   // Pass original stringId to handler if needed by OnboardingStepper
                  onClick={() => onSetupClick(stringId)}
                  className="mt-2 px-3 py-1 bg-white border border-gray-400 rounded-full text-xs font-semibold" // Adjusted style
                >
                  Set&nbsp;up
                </button>
                {/* Show bonus only if not fully set up */}
                {setupSteps < 4 && <div className="text-xs text-gray-500 mt-1">+50&nbsp;PTS</div>}
              </>
            )}
          </div>
        );
      })}

      {/* “Add new” tile */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onSetupClick(null)}
          className="mt-[32px] w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-full text-3xl text-gray-400 hover:border-red-600 hover:text-red-600 transition-colors" // Adjusted styling
        >
          +
        </button>
        <div // Changed button to div for consistency
          // onClick={() => onSetupClick(null)} // Button above handles click
          className="mt-2 text-sm text-gray-600" // Adjusted styling
        >
          Add
        </div>
      </div>
    </div>
  );
}