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
import RewardsScreen from './RewardsScreen'; // Import RewardsScreen
import PointsRooLogo from '../assets/points-roo.svg';

const rewardTabs = [
  'Flights', 'Hotels', 'Activities',
  'Marketplace', 'Gift Cards', 'Entertainment'
];

// Simple hook for responsive check
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isDesktop;
};

const useRewardsMap = () => useMemo(() => ({
  Flights: flightsList,
  Hotels: hotelsList,
  Activities: activitiesList,
  Marketplace: marketplaceList,
  'Gift Cards': giftCardsList,
  Entertainment: entertainmentList
}), []);

export default function WTESelection({ goTo, currentStepIndex }) {
  // Category tabs for WTE selection
  const categories = [
    { key: 'everyday', label: 'EVERYDAY' },
    { key: 'big', label: 'BIG POINTS' },
    { key: 'shop', label: 'SHOP' },
    { key: 'travel', label: 'TRAVEL' }
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

    // Default to 'Flights' if no explicit selection, to match user request for "flight list" examples.
    // If the current tab has valid options, we could stick to it, but the request was specific.
    // Let's favor the current tab IF it has options, otherwise fallback or default to Flights?
    // User request: "return to the 'example' state - which chooses an 'example' reward from the flight list"
    // This implies strictly flights.
    const tabToUse = 'Flights';
    const list = rewardsMap[tabToUse] || [];

    const opts = list.filter(r => typeof r.pts === 'number' && r.pts <= pts);
    const best = opts.sort((a, b) => b.pts - a.pts)[0] || null;

    if (best?.id !== current.selectedRewardId) {
      updateSelectedRewardId(best?.id ?? null, tabToUse, false);
    }
  }, [
    current?.totalAnnualPts,
    // Remove current.selectedWTU dependency if we force Flights? 
    // Actually we should keep it if we want to re-run when points change.
    current?.hasSelectedReward,
    current?.selectedRewardId,
    rewardsMap,
    updateSelectedRewardId
  ]);

  // Derive the full selectedReward object (may be unaffordable)
  const selectedRewardCategory = saved.selectedRewardCategory;

  // Derive the full selectedReward object (may be unaffordable)
  const selectedReward = useMemo(() => {
    // If we have a specific category saved (e.g. 'Flights' from auto-pick), use that.
    // Otherwise fallback to the active tab.
    const cat = selectedRewardCategory || activeRewardTab;
    const list = rewardsMap[cat] || [];
    return list.find(r => r.id === selectedRewardIdFromSaved) || null;
  }, [rewardsMap, activeRewardTab, selectedRewardIdFromSaved, selectedRewardCategory]);

  const isTargetMode = selectedReward && selectedReward.pts > totalAnnualPts;
  const ptsLeft = isTargetMode ? selectedReward.pts - totalAnnualPts : 0;
  const progressPercent = isTargetMode
    ? Math.min(100, Math.max(0, (totalAnnualPts / selectedReward.pts) * 100))
    : 0;

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

  // Responsive state
  const isDesktop = useIsDesktop();

  if (!current) {
    return <div className="p-6 text-center">Loading selection...</div>;
  }

  // Common Header Content
  const renderHeader = () => (
    <div className={`flex items-center px-4 py-4 bg-white ${!isDesktop && 'border-b border-gray-100'}`}>
      {!isDesktop && (
        <button
          onClick={() => goTo(currentStepIndex - 1)}
          className="p-2 mr-2 -ml-2 text-gray-500"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div>
        <h2 className="text-[24px] font-medium tracking-tight text-[#323232]">
          Ways to {isDesktop ? 'earn and use points' : 'earn points'}
        </h2>
        {isDesktop && (
          <p className="text-[14px] text-gray-600 mt-1">
            Select ways of earning Qantas Points to add to your dashboard. You can change your selection at any time.
          </p>
        )}
      </div>
      {!isDesktop && (
        <button
          onClick={() => setIsHelpOpen(true)}
          className="ml-auto p-2 text-gray-800 hover:text-red-600 transition-colors"
          aria-label="Help"
        >
          <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className={`${isDesktop ? 'w-full min-h-screen bg-[#F7F7F7]' : 'max-w-md mx-auto pb-[500px] relative bg-white'}`}>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Main Container */}
      <div className={isDesktop ? "max-w-[1200px] mx-auto px-8 pt-6" : ""}>
        {renderHeader()}

        <div className={isDesktop ? "flex gap-8 mt-6 items-start" : ""}>
          {/* Left Column (WTE List) */}
          <div className={isDesktop ? "w-[380px] shrink-0" : ""}>
            {/* Target Header in Mobile only (or maybe distinct on desktop?) */}
            {!isDesktop && isTargetMode && (
              <div className="px-3 pb-2 bg-gray-100">
                <div className="bg-white rounded-[12px] p-3 border border-gray-50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-[16px] font-medium text-[#323232]">Target:</span>
                      <img
                        alt=""
                        className="w-[18px] h-[20px]"
                        src="data:image/svg+xml,%3csvg%20width='27'%20height='24'%20viewBox='0%200%2027%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.0576%2023.6163C26.0794%2023.639%2026.1012%2023.639%2026.1232%2023.639C26.167%2023.639%2026.1891%2023.639%2026.2329%2023.5933C26.2764%2023.5476%2026.2764%2023.4564%2026.2329%2023.4107C23.6278%2020.5556%2020.4319%2018.249%2016.8637%2016.7647C15.7692%2016.3078%2015.7692%2016.3078%2015.7692%2016.3078C15.1999%2016.0563%2014.8279%2015.4856%2014.8279%2014.8232C14.8935%2012.3795%2020.4099%2012.882%2020.9791%2011.7171C21.0668%2011.5116%2021.0668%2011.5116%2021.0668%2011.5116C19.9284%2010.4838%2018.5929%209.73024%2017.1046%209.2964C17.0828%209.36483%2017.0387%209.63882%2017.3451%2010.1641C17.6738%2010.7123%2016.9949%2011.603%2015.988%2010.6439C15.9004%2010.5752%2015.9004%2010.5752%2015.9004%2010.5752C8.58908%203.58648%205.21819%208.19991%200.2491%200.0695199C0.20529%200.000828303%200.139698%20-0.0218967%200.0738597%200.0238116C0.00826853%200.0695199%20-0.0137602%200.137953%200.00826853%200.206386C3.92666%2010.0499%2011.9384%207.97163%2012.8797%2017.1528C12.9235%2017.4955%2013.1644%2017.7695%2013.4926%2017.8152C17.9362%2018.546%2022.2707%2020.4645%2026.0358%2023.6163H26.0576'%20fill='%23E40000'/%3e%3c/svg%3e"
                      />
                      <span className="text-[16px] font-medium text-[#323232]">
                        {selectedReward.pts.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-[#999999] uppercase">PTS</span>
                    </div>
                    <div className="bg-[#E1F5F5] px-2 py-1.5 rounded-[6px] flex items-center space-x-1 border border-[#C5EDED]">
                      <img
                        alt=""
                        className="w-[14px] h-[16px] opacity-70"
                        src="data:image/svg+xml,%3csvg%20width='27'%20height='24'%20viewBox='0%200%2027%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.0576%2023.6163C26.0794%2023.639%2026.1012%2023.639%2026.1232%2023.639C26.167%2023.639%2026.1891%2023.639%2026.2329%2023.5933C26.2764%2023.5476%2026.2764%2023.4564%2026.2329%2023.4107C23.6278%2020.5556%2020.4319%2018.249%2016.8637%2016.7647C15.7692%2016.3078%2015.7692%2016.3078%2015.7692%2016.3078C15.1999%2016.0563%2014.8279%2015.4856%2014.8279%2014.8232C14.8935%2012.3795%2020.4099%2012.882%2020.9791%2011.7171C21.0668%2011.5116%2021.0668%2011.5116%2021.0668%2011.5116C19.9284%2010.4838%2018.5929%209.73024%2017.1046%209.2964C17.0828%209.36483%2017.0387%209.63882%2017.3451%2010.1641C17.6738%2010.7123%2016.9949%2011.603%2015.988%2010.6439C15.9004%2010.5752%2015.9004%2010.5752%2015.9004%2010.5752C8.58908%203.58648%205.21819%208.19991%200.2491%200.0695199C0.20529%200.000828303%200.139698%20-0.0218967%200.0738597%200.0238116C0.00826853%200.0695199%20-0.0137602%200.137953%200.00826853%200.206386C3.92666%2010.0499%2011.9384%207.97163%2012.8797%2017.1528C12.9235%2017.4955%2013.1644%2017.7695%2013.4926%2017.8152C17.9362%2018.546%2022.2707%2020.4645%2026.0358%2023.6163H26.0576'%20fill='%23E40000'/%3e%3c/svg%3e"
                      />
                      <span className="text-[13px] font-bold text-[#007A7A]">
                        {ptsLeft.toLocaleString()}
                      </span>
                      <span className="text-[11px] font-bold text-[#007A7A]">left</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#E40000] transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Category Tabs */}
            <div className={`pt-2 ${isDesktop ? 'bg-transparent mb-4' : 'bg-gray-100'}`}>
              <div className={isDesktop ? "uppercase text-[12px] font-bold text-gray-400 mb-2 pl-1" : ""}>
                {isDesktop && "Everyday Filters"}
              </div>
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                ref={tabsRef}
                variant={isDesktop ? 'minimal' : 'default'} // Assuming we could style them differently if needed
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
          </div>

          {/* Right Column (Rewards & Preview) - DESKTOP ONLY */}
          {isDesktop && (
            <div className="flex-grow bg-white rounded-[24px] p-6 shadow-sm min-h-[600px]">
              <RewardsScreen
                goTo={goTo}
                isEmbedded={true}
                desktopMode={true}
              />
            </div>
          )}
        </div>
      </div>

      {!isDesktop && selectedWTEs.length > 0 && (
        <StickyFooter
          totalPts={totalAnnualPts}
          selectedReward={selectedReward}
          hasSelectedReward={current.hasSelectedReward}
          onExploreRewardsClicked={handleSeeMoreClick}
          onHomepageClicked={handleAddToDashboard}
          initialMinimized={isTargetMode}
        />
      )}

      {/* Desktop Sticky Footer / CTA Bar? 
          The design shows "Add the selected ways to earn and reward to your homepage to continue" + [GO TO HOMEPAGE]
          at the bottom of the screen.
      */}
      {isDesktop && selectedWTEs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-8 flex justify-end items-center z-50">
          <span className="mr-6 text-[14px] font-medium text-gray-700">
            Add the selected ways to earn and reward to your homepage to continue.
          </span>
          <button
            onClick={handleAddToDashboard}
            className="bg-[#E40000] text-white font-bold text-[14px] px-8 py-3 rounded-[4px] tracking-wider hover:bg-red-700 uppercase"
          >
            Go to Homepage
          </button>
        </div>
      )}
    </div>
  );
}
