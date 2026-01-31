// src/components/MonthWrapUpModal.jsx
import React, { useState, useEffect } from 'react';
import { loadDashboardState, saveDashboardState } from '../utils/dashboardStorage';
import { WTEs } from '../data';
import giftUrl from '../assets/gift.svg';           // 🎁 icon

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const pct = (val, tgt) => Math.min(Math.round((val / (tgt || 1)) * 100), 100);

export default function MonthWrapUpModal({ data, onClose }) {
  const {
    monthName,
    totalEarned,
    totalTarget,
    earnedById = {},
    targetsById = {},
  } = data;

  /* ────────────────────────────────────────────────────────────── */
  const [bonusCollected, setBonusCollected] = useState(false);

  const hitOverall = totalEarned >= totalTarget;
  const hitAnyWTE  = Object.entries(targetsById)
                      .some(([id, t]) => earnedById[id] >= t);
  const showBonus  = !bonusCollected && (hitOverall || hitAnyWTE);

  const handleCollect = () => {
    const st = loadDashboardState();
    st.currentPtsBalance += 50;
    saveDashboardState(st);
    setBonusCollected(true);
  };

  /* lock body scroll while modal is open */
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => { body.style.overflow = prev; };
  }, []);

  /* ────────────────────────────────────────────────────────────── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[28px] bg-white p-6 pb-10 shadow-xl">
        {/* close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl leading-none">×</button>

        {/* headings */}
        <h4 className="text-center text-sm font-semibold">{monthName} Wrap-up</h4>
        <h2 className="mt-1 text-center text-2xl font-bold">{monthName} Points&nbsp;Earn</h2>
        <p className="mt-4 text-center text-lg">
          {hitOverall ? 'Monthly target reached!' : 'Great progress!'}
        </p>

        {/* total bar */}
        <div className="mt-8">
          <div className="text-sm mb-1">Total {monthName} Earn</div>
          <div className="relative h-2 rounded-full bg-gray-300">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-red-600"
              style={{ width: `${pct(totalEarned, totalTarget)}%` }}
            />
          </div>
        </div>

        {/* per-WTE rows */}
        <div className="mt-6 space-y-5">
          {Object.keys(targetsById).map(id => {
            const tgt   = targetsById[id];
            const got   = earnedById[id] || 0;
            const met   = got >= tgt;
            const wte   = WTEs.find(w => w.id === +id) || { name: id };
            const logo  = wte.iconSrc || giftUrl;

            return (
              <div key={id} className="flex items-center gap-3">
                {/* logo */}
                <img src={logo} alt="" className="h-6 w-6 shrink-0 object-contain" />

                {/* label + bar */}
                <div className="flex-1">
                  <div className="text-sm">{wte.name}</div>
                  <div className="relative h-2 rounded-full bg-gray-300">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${pct(got, tgt)}%`, backgroundColor: met ? '#DC2626' : '#000' }}
                    />
                  </div>
                </div>

                {/* gift – always visible; ring when met */}
                <div
                  className={`shrink-0 rounded-full p-[3px] ${
                    met ? 'ring-2 ring-red-600' : 'ring-2 ring-transparent'
                  }`}
                >
                  <img src={giftUrl} alt="" className="h-5 w-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* bonus section */}
        {showBonus && (
          <div className="mt-10 text-center space-y-4">
            <p className="text-lg font-semibold">
              {hitOverall ? 'Great – you hit your monthly target!' : 'Great – you met a target!'}
            </p>
            <img src={giftUrl} alt="" className="h-10 w-10 mx-auto" />
            <p className="text-lg font-semibold">+50&nbsp;Bonus&nbsp;Points!</p>

            {!bonusCollected ? (
              <button
                onClick={handleCollect}
                className="mx-auto px-12 py-2 rounded-sm border-2 border-red-600 text-red-600 font-semibold tracking-widest"
              >
                COLLECT
              </button>
            ) : (
              <p className="text-sm text-green-600 font-semibold">Added to balance!</p>
            )}
          </div>
        )}

        {/* continue */}
        <button
          onClick={onClose}
          className="w-full mt-8 py-3 bg-red-600 font-semibold tracking-widest text-white text-base rounded-sm"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
