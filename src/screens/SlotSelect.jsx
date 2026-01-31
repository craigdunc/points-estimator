// src/screens/SlotSelect.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';

/* static constants */
const PASSWORD = 'getready321';
const UNLOCK_FLAG = 'qff_demo_unlocked';

// Changed props: accepting goTo and currentStepIndex instead of goNext
export default function SlotSelect({ goTo, currentStepIndex }) {
  /* ── 1. hooks that must ALWAYS run ─────────────────────────── */
  const {
    slots,
    activeSlotId,
    createSlot,
    loadSlot,
    renameSlot,
    deleteSlot,
  } = useSaveSlots();

  /* password gate hooks (always exist) */
  const [unlocked, setUnlocked] = useState(
    localStorage.getItem(UNLOCK_FLAG) === 'true'
  );
  const [pwInput, setPwInput] = useState('');
  const pwRef = useRef(null);

  /* slot-editing hooks (declare them even if locked) */
  const [draftName, setDraftName] = useState('');
  const nameInputRef = useRef(null);

  /* ── 2. side-effects ───────────────────────────────────────── */
  useEffect(() => {
    if (!unlocked) pwRef.current?.focus();
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked) return;
    const slot = slots.find(s => s.id === activeSlotId);
    setDraftName(slot?.name || '');
    // Only focus if a slot is actually active
    if (activeSlotId) {
      nameInputRef.current?.focus();
    }
  }, [unlocked, activeSlotId, slots]);

  /* ── 3. handlers ───────────────────────────────────────────── */
  const tryUnlock = () => {
    if (pwInput.trim() === PASSWORD) {
      localStorage.setItem(UNLOCK_FLAG, 'true');
      setUnlocked(true);
    } else {
      alert('Sorry, that password is incorrect.');
      setPwInput('');
      pwRef.current?.focus();
    }
  };

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

  /* ── 4. render password screen if locked ───────────────────── */
  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        {/* ... Password UI ... */}
        <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow space-y-4">
          <h1 className="text-xl font-bold text-center">Settings&nbsp;Locked</h1>
          <input
            ref={pwRef} type="password" value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tryUnlock()}
            placeholder="********"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
          <button
            onClick={tryUnlock}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  /* ── 5. (unlocked) normal Slot-select UI ───────────────────── */
  return (
    <div className="p-6 w-full relative">
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
      <p className="mb-6 text-gray-600">Switch prototype save slots or change student name.</p>

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
              className="block w-full pl-12 pr-12 py-2 bg-transparent focus:outline-none" // Adjusted padding
            />
          ) : (
            <div
              onClick={() => loadSlot(slot.id)}
              className="pl-12 pr-12 py-2 cursor-pointer" // Adjusted padding
            >
              {slot.name || `Slot ${idx + 1}`} {/* Show default name if empty */}
            </div>
          )}

          {/* advance arrow */}
          {/* Updated onClick to use the new handler */}
          <button
            onClick={handleGoToNextScreen}
            // Disable if no slot is active or if the active slot has no name
            disabled={!activeSlotId || (slot.id === activeSlotId && !draftName.trim())}
            className={`absolute inset-y-0 right-0 w-10 flex items-center justify-center text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed`}
          >
            ▶
          </button>
        </div>
      ))}

      {/* actions row */}
      <div className="mt-4 flex space-x-4"> {/* Added space-x */}
        <button
          onClick={() =>
            createSlot(`Slot ${slots.length + 1}`, { /* ... initial state ... */ })
          }
          className="text-red-600 hover:underline" // Added hover style
        >
          + New Slot
        </button>

        {activeSlotId && (
          <button
            onClick={() => { if (window.confirm('Are you sure you want to delete this slot?')) deleteSlot(activeSlotId); }}
            className="text-red-600 hover:underline" // Added hover style and confirmation
          >
            Delete Slot {slots.findIndex(s => s.id === activeSlotId) + 1}
          </button>
        )}
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