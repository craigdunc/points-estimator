// src/screens/WTESelection.jsx

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import {
  WTEs,
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList
} from '../data';
import CategoryTabs from '../components/CategoryTabs';
import WTEList from '../components/WTEList';
import StickyFooter from '../components/StickyFooter';
import HelpModal from '../components/HelpModal';

const rewardTabs = [
  'Flights', 'Hotels', 'Activities',
  'Marketplace', 'Gift Cards', 'Entertainment'
];

const useRewardsMap = () => useMemo(() => ({
  Flights: flightsList,
  Hotels: hotelsList,
  Activities: activitiesList,
  Marketplace: marketplaceList,
  'Gift Cards': giftCardsList,
  Entertainment: entertainmentList
}), []);

export default function WTESelection({ goTo }) {
  // Category tabs for WTE selection
  const categories = [
    { key: 'everyday', label: 'Everyday Earners' },
    { key: 'big', label: 'Big Points Earners' },
    { key: 'shop', label: 'Shop and Earn' },
    { key: 'travel', label: 'Travel and Earn' }
  ];

  const {
    current,
    updateSelectedWTU,
    updateSelectedRewardId,
    updateSelectedWTEs,
    updateTierIndex
  } = useSaveSlots();
  const rewardsMap = useRewardsMap();

  // Default tier index (middle of available tiers)
  const defaultTierIndexById = useMemo(() => {
    const acc = {};
    WTEs.forEach(w => (acc[w.id] = Math.floor((w.tiers?.length || 1) / 2)));
    return acc;
  }, []);

  // Persisted state or defaults
  const saved = current || {
    selectedWTEs: [],
    tierIndexById: defaultTierIndexById,
    totalAnnualPts: 0,
    selectedWTU: rewardTabs[0],
    selectedRewardId: null
  };

  const selectedWTEs = saved.selectedWTEs;
  const tierIndexById = saved.tierIndexById;
  const activeRewardTab = saved.selectedWTU;
  const selectedRewardIdFromSaved = saved.selectedRewardId;
  const totalAnnualPts = saved.totalAnnualPts;

  // UI state for filtering/list
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [expandedId, setExpandedId] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const tabsRef = useRef(null);

  // Rewards available under current points & tab
  const availableRewards = useMemo(() => {
    const list = rewardsMap[activeRewardTab] || [];
    return list.filter(r => typeof r.pts === 'number' && r.pts <= totalAnnualPts);
  }, [activeRewardTab, totalAnnualPts, rewardsMap]);

  // First-time help logic
  useEffect(() => {
    const hasSeenHelp = localStorage.getItem('hasSeenWTEHelp');
    if (!hasSeenHelp) {
      setTimeout(() => setIsHelpOpen(true), 500);
      localStorage.setItem('hasSeenWTEHelp', 'true');
    }
  }, []);

  // Auto-pick best reward if none selected or if it's currently an example
  useEffect(() => {
    if (!current) return;
    // If the user EXPLICITLY picked something, don't change it.
    if (current.hasSelectedReward) return;

    const pts = current.totalAnnualPts;
    const tab = current.selectedWTU || rewardTabs[0];
    const list = rewardsMap[tab] || [];
    const opts = list.filter(r => typeof r.pts === 'number' && r.pts <= pts);
    const best = opts.sort((a, b) => b.pts - a.pts)[0] || null;

    if (best?.id !== current.selectedRewardId) {
      updateSelectedRewardId(best?.id ?? null, false);
    }
  }, [
    current?.totalAnnualPts,
    current?.selectedWTU,
    current?.hasSelectedReward,
    current?.selectedRewardId,
    rewardsMap,
    updateSelectedRewardId
  ]);

  // Derive the full selectedReward object for footer
  const selectedReward = useMemo(
    () => availableRewards.find(r => r.id === selectedRewardIdFromSaved) || null,
    [availableRewards, selectedRewardIdFromSaved]
  );

  // Center scroll on activeCategory
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-key="${activeCategory}"]`);
    if (!btn) return;
    const cw = container.offsetWidth;
    const center = btn.offsetLeft + btn.offsetWidth / 2;
    container.scrollTo({ left: center - cw / 2, behavior: 'smooth' });
  }, [activeCategory]);

  // Handlers
  const toggleSelectWTE = useCallback(id => {
    const curr = current?.selectedWTEs || [];
    const tiers = current?.tierIndexById || defaultTierIndexById;
    const exists = curr.some(w => w.id === id);
    const next = exists
      ? curr.filter(w => w.id !== id)
      : [...curr, { id, level: String(tiers[id] ?? defaultTierIndexById[id]) }];
    updateSelectedWTEs(next);
  }, [current, updateSelectedWTEs, defaultTierIndexById]);

  const toggleExpandWTE = useCallback(
    id => setExpandedId(prev => (prev === id ? null : id)),
    []
  );

  const handleTierChange = useCallback((id, idx) => {
    updateTierIndex(id, idx);
    const curr = current?.selectedWTEs || [];
    const exists = curr.some(w => w.id === id);
    let next;

    if (exists) {
      // Update existing selection
      next = curr.map(w => (w.id === id ? { ...w, level: String(idx) } : w));
    } else {
      // Auto-select if not already in list
      next = [...curr, { id, level: String(idx) }];
    }

    updateSelectedWTEs(next);
  }, [current, updateTierIndex, updateSelectedWTEs]);

  const handleSeeMoreClick = useCallback(() => goTo(4), [goTo]);
  const handleAddToDashboard = useCallback(() => goTo(5), [goTo]);

  const selectedIdsForList = useMemo(() => selectedWTEs.map(w => w.id), [selectedWTEs]);

  if (!current) {
    return <div className="p-6 text-center">Loading selection...</div>;
  }

  return (
    <div className="max-w-md mx-auto pb-[500px] relative bg-white">
      {/* Header Container */}
      <div className="flex justify-between items-center px-6 pt-6 pb-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Points Estimator</h2>
        <button
          onClick={() => setIsHelpOpen(true)}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Help"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Category Tabs - Pushed down by header and extra padding */}
      <div className="pt-4">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          ref={tabsRef}
        />
      </div>

      <WTEList
        WTEs={WTEs}
        activeCategory={activeCategory}
        selectedIds={selectedIdsForList}
        expandedId={expandedId}
        tierIndexById={tierIndexById}
        onToggleSelect={toggleSelectWTE}
        onToggleExpand={toggleExpandWTE}
        onTierChange={handleTierChange}
      />

      {selectedWTEs.length > 0 && (
        <StickyFooter
          totalPts={totalAnnualPts}
          selectedReward={selectedReward}
          hasSelectedReward={current.hasSelectedReward}
          onSeeMoreClick={handleSeeMoreClick}
          onAddToDashboard={handleAddToDashboard}
        />
      )}
    </div>
  );
}
