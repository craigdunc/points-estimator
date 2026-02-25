// src/screens/SlotSelect.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';

// Slot selects are now directly accessible
const UNLOCK_FLAG = 'qff_demo_unlocked';

// Changed props: accepting goTo and currentStepIndex instead of goNext
export default function SlotSelect({ goTo }) {
  /* ── 1. hooks that must ALWAYS run ─────────────────────────── */
  const {
    slots,
    activeSlotId,
    createSlot,
    loadSlot,
    renameSlot,
    deleteSlot,
  } = useSaveSlots();

  /* slot-editing hooks */
  const [draftName, setDraftName] = useState('');
  const nameInputRef = useRef(null);

  /* ── 2. side-effects ───────────────────────────────────────── */
  useEffect(() => {
    const slot = slots.find(s => s.id === activeSlotId);
    setDraftName(slot?.name || '');
    if (activeSlotId) {
      nameInputRef.current?.focus();
    }
  }, [activeSlotId, slots]);

  /* ── 3. handlers ───────────────────────────────────────────── */

  const commitRename = id => {
    const name = draftName.trim();
    if (name) renameSlot(id, name);
  };

  // --- Navigation Handler ---
  const handleGoToNextScreen = () => {
    // Ensure a slot is selected and has a name before proceeding
    const currentSlot = slots.find(s => s.id === activeSlotId);
    if (activeSlotId && currentSlot?.name) {
      // Navigate to the next step (Intro1, index 1)
      goTo(1);
    } else {
      alert('Please select a slot and ensure it has a name.');
      // Optionally focus the name input if an active slot exists
      if (activeSlotId) {
        nameInputRef.current?.focus();
      }
    }
  };


  /* ── 5. (unlocked) normal Slot-select UI ───────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[12px] shadow-sm border border-gray-100 w-full max-w-[500px] relative">
        {/* Close Button */}
        <button
          onClick={() => goTo(1)}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <p className="mb-6 text-gray-600">Switch prototype save slots or Change name.</p>

        {slots.map((slot, idx) => (
          <div
            key={slot.id}
            className={`relative pl-3 mb-2 w-full rounded border overflow-hidden
            ${slot.id === activeSlotId
                ? 'border-red-600 bg-red-50'
                : 'border-gray-300 bg-white'}`}
          >
            {/* slot number pill */}
            <button
              onClick={() => loadSlot(slot.id)}
              className={`absolute inset-y-0 left-0 w-10 flex items-center justify-center
              ${slot.id === activeSlotId
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-300 text-black'}`}
            >
              {idx + 1}
            </button>

            {/* editable name / label */}
            {slot.id === activeSlotId ? (
              <input
                ref={nameInputRef}
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                onBlur={() => commitRename(slot.id)}
                onKeyDown={e => e.key === 'Enter' && nameInputRef.current.blur()}
                placeholder="Enter name..." // Added placeholder
                className="block w-full pl-12 pr-20 py-2 bg-transparent focus:outline-none" // Adjusted padding
              />
            ) : (
              <div
                onClick={() => loadSlot(slot.id)}
                className="pl-12 pr-20 py-2 cursor-pointer truncate" // Adjusted padding
              >
                {slot.name || `Slot ${idx + 1}`} {/* Show default name if empty */}
              </div>
            )}

            {/* advance arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
              {/* Delete button (only show on inactive slots, or if it's the only slot we can still show it but maybe better to just show it always) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSlot(slot.id);
                }}
                className={`p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors`}
                title="Delete Slot"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <button
                onClick={handleGoToNextScreen}
                disabled={slot.id !== activeSlotId || !draftName.trim()}
                className={`w-8 h-8 flex items-center justify-center text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed`}
              >
                ▶
              </button>
            </div>
          </div>
        ))}

        {/* actions row */}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() =>
              createSlot(`Slot ${slots.length + 1}`, {})
            }
            className="text-red-600 hover:underline font-medium text-sm"
          >
            + New Slot
          </button>
        </div>
      </div>
    </div>
  );
}

// Remember to define the initial state for createSlot if it's not done in useSaveSlots
// const initialSlotState = {
//   firstRunCompleted: false, selectedWTEs: [], totalAnnualPts: 0,
//   selectedWTU: null, selectedRewardId: null, setupProgressByWTE: {},
//   monthlyTargetByWTE: {}, monthlyEarnedByWTE: {},
//   currentMonth: new Date().toISOString().slice(0, 7), currentPtsBalance: 0,
// };