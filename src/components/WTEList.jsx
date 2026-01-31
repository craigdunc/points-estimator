import React from 'react';
import PointsRooLogo from '../assets/points-roo.svg';

/**
 * WTEList
 * Props:
 * - WTEs: array of all WTE objects
 * - activeCategory: string
 * - selectedIds: array of selected WTE ids
 * - expandedId: id of currently expanded WTE (or null)
 * - tierIndexById: { [id]: number } mapping to current tier index (0–4)
 * - onToggleSelect: (id) => void
 * - onToggleExpand: (id) => void
 * - onTierChange: (id, newIndex) => void
 */
export default function WTEList({
  WTEs,
  activeCategory,
  selectedIds,
  expandedId,
  tierIndexById,
  onToggleSelect,
  onToggleExpand,
  onTierChange
}) {
  return (
    <div className="space-y-0">
      {WTEs.filter(w => w.category === activeCategory).map(w => {
        const tierIdx = tierIndexById[w.id] ?? 0;
        const tier = Array.isArray(w.tiers) && w.tiers[tierIdx]
          ? w.tiers[tierIdx]
          : { pts: 0, spend: 0 };
        const isSelected = selectedIds.includes(w.id);
        const isExpanded = expandedId === w.id;

        return (
          <div key={w.id} className="border-gray-300 border-b -mb-[1px]">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-[22px] h-[22px] ml-[4px]"
                  checked={isSelected}
                  onChange={() => onToggleSelect(w.id)}
                  style={{ accentColor: '#dc2626' }}
                />

                <img
                  src={w.iconSrc}
                  alt={`${w.name} logo`}
                  className="ml-3 w-[40px] object-contain"
                />

                <div className="ml-3">
                  <div className="font-bold text-sm">{w.name}</div>

                  <div className="flex items-center space-x-1 text-sm">
                    <span>Est</span>
                    <img
                      src={PointsRooLogo}
                      alt="Points Roo logo"
                      className="w-4 h-4"
                    />
                    <span className="font-bold text-base">
                      {tier.pts.toLocaleString()}
                    </span>
                    <span className="uppercase text-xs pt-[3px] mr-[2px]">
                      PTS
                    </span>
                    <span>/year</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onToggleExpand(w.id)}
                className="p-1 focus:outline-none"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-3">
                <div className="mb-3 text-sm">
                  Approx. ${tier.spend.toLocaleString()} spend/year
                </div>
                <input
                  type="range"
                  min={0}
                  max={(w.tiers?.length ?? 1) - 1}
                  step={1}
                  value={tierIdx}
                  className="w-full h-[6px] bg-gray-200 accent-red-500 focus:outline-none appearance-none rounded-full mb-4"
                  onChange={e => onTierChange(w.id, Number(e.target.value))}
                />
                <div className="py-3 text-sm">{w.desc}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
