import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import {
  WTEs,
  WTE_HIERARCHY,
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList
} from '../data';
import CategoryTabs from '../components/CategoryTabs';
import WTEList from '../components/WTEList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyFooter from '../components/StickyFooter';
import RewardsScreen from './RewardsScreen'; // Import RewardsScreen
import PointsRooLogo from '../assets/points-roo.svg';
import { useViewportMode } from '../hooks/useViewportMode';
import DuoMascot from '../assets/icons/duo.png';

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

const ONBOARDING_STEPS = [
  {
    title: "Let's get started!",
    text: "Select ways of earning Qantas Points to add to your dashboard. You can change your selection at any time.",
    buttonLabel: "HELP ME"
  },
  {
    title: "Ways to earn",
    text: "There are Four main ways to earn in the program. We can take a look at each one-by-one.",
    buttonLabel: "OK"
  }
];

const LeisureIcon = () => (
  <div className="relative w-4 h-4 flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E40000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#E40000] rounded-full border border-white" />
  </div>
);

const BuildingIcon = () => (
  <div className="w-4 h-4 flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#323232" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  </div>
);

export default function WTESelection({ goTo, currentStepIndex }) {
  // Category tabs for WTE selection - now based on Section Hierarchy
  const categories = useMemo(() => WTE_HIERARCHY.map(section => ({
    key: section.id,
    label: section.label.toUpperCase()
  })), []);

  const {
    current,
    updateSelectedRewardId,
    updateSelectedWTEs,
    updateTierIndex,
    updateActiveDuoCard
  } = useSaveSlots();
  const rewardsMap = useRewardsMap();

  const defaultTierIndexById = useMemo(() => {
    const acc = {};
    WTEs.forEach(w => (acc[w.id] = Math.floor((w.tiers?.length || 1) / 2)));
    return acc;
  }, []);

  // Responsive state
  const { viewportMode, isSplitView } = useViewportMode();
  const isMobile = viewportMode === 'mobile';

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
  const tabsRef = useRef(null);
  const rewardsContainerRef = useRef(null);
  const [collapsedCategories, setCollapsedCategories] = useState(new Set());
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [duoExpanded, setDuoExpanded] = useState(false);
  const [duoVisible, setDuoVisible] = useState(false);

  useEffect(() => {
    if (current?.activeDuoCard === 'onboarding') {
      const expandTimer = setTimeout(() => setDuoExpanded(true), 1000);
      const visibleTimer = setTimeout(() => setDuoVisible(true), 1800);
      return () => {
        clearTimeout(expandTimer);
        clearTimeout(visibleTimer);
      };
    } else {
      setDuoExpanded(false);
      setDuoVisible(false);
    }
  }, [current?.activeDuoCard]);

  // Auto-pick best reward
  useEffect(() => {
    if (!current) return;
    if (current.hasSelectedReward) return;
    const pts = current.totalAnnualPts;
    const tabToUse = 'Flights';
    const list = rewardsMap[tabToUse] || [];
    const opts = list.filter(r => typeof r.pts === 'number' && r.pts <= pts);
    const best = opts.sort((a, b) => b.pts - a.pts)[0] || null;
    if (best?.id !== current.selectedRewardId) {
      updateSelectedRewardId(best?.id ?? null, tabToUse, false);
    }
  }, [current, current?.totalAnnualPts, current?.hasSelectedReward, current?.selectedRewardId, rewardsMap, updateSelectedRewardId]);

  const selectedRewardCategory = saved.selectedRewardCategory;
  const selectedReward = useMemo(() => {
    const cat = selectedRewardCategory || activeRewardTab;
    const list = rewardsMap[cat] || [];
    return list.find(r => r.id === selectedRewardIdFromSaved) || null;
  }, [rewardsMap, activeRewardTab, selectedRewardIdFromSaved, selectedRewardCategory]);

  const isTargetMode = selectedReward && selectedReward.pts > totalAnnualPts;
  const ptsLeft = isTargetMode ? selectedReward.pts - totalAnnualPts : 0;
  const progressPercent = isTargetMode
    ? Math.min(100, Math.max(0, (totalAnnualPts / selectedReward.pts) * 100))
    : 0;

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-key="${activeCategory}"]`);
    if (!btn) return;
    const cw = container.offsetWidth;
    const center = btn.offsetLeft + btn.offsetWidth / 2;
    container.scrollTo({ left: center - cw / 2, behavior: 'smooth' });
  }, [activeCategory]);

  const toggleSelectWTE = useCallback(id => {
    const curr = current?.selectedWTEs || [];
    const tiers = current?.tierIndexById || defaultTierIndexById;
    const exists = curr.some(w => w.id === id);
    const next = exists
      ? curr.filter(w => w.id !== id)
      : [...curr, { id, level: String(tiers[id] ?? defaultTierIndexById[id]) }];
    updateSelectedWTEs(next);
  }, [current, updateSelectedWTEs, defaultTierIndexById]);

  const toggleExpandWTE = useCallback(id => setExpandedId(prev => (prev === id ? null : id)), []);

  const handleTierChange = useCallback((id, idx) => {
    updateTierIndex(id, idx);
    const curr = current?.selectedWTEs || [];
    const exists = curr.some(w => w.id === id);
    let next;
    if (exists) {
      next = curr.map(w => (w.id === id ? { ...w, level: String(idx) } : w));
    } else {
      next = [...curr, { id, level: String(idx) }];
    }
    updateSelectedWTEs(next);
  }, [current, updateTierIndex, updateSelectedWTEs]);

  const handleSeeMoreClick = useCallback(() => goTo(4), [goTo]);
  const handleAddToDashboard = useCallback(() => goTo(5), [goTo]);

  const handleOnboardingAction = useCallback(() => {
    if (onboardingStep === 0) {
      if (isSplitView) {
        setCollapsedCategories(new Set(categories.map(c => c.key)));
      } else {
        updateSelectedWTEs([]);
      }
      setOnboardingStep(1);
    } else if (onboardingStep === 1) {
      setOnboardingStep(prev => Math.min(prev + 1, ONBOARDING_STEPS.length - 1));
    }
  }, [onboardingStep, isSplitView, categories, updateSelectedWTEs]);

  const selectedIdsForList = useMemo(() => selectedWTEs.map(w => w.id), [selectedWTEs]);

  const renderHeader = () => <Header isMobile={isMobile} goTo={goTo} currentStepIndex={currentStepIndex} />;

  const toggleCategory = useCallback((key) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const renderSplitViewSections = () => (
    <div className="space-y-4">
      {WTE_HIERARCHY.map((section) => {
        const isCollapsed = collapsedCategories.has(section.id);
        return (
          <section key={section.id}>
            <div
              className={`flex items-center justify-between mb-1.5 px-1 cursor-pointer select-none group`}
              onClick={() => toggleCategory(section.id)}
            >
              <h3 className="text-[12px] font-medium tracking-wide text-[#666] uppercase leading-none group-hover:text-[#323232] transition-colors">
                {section.label}
              </h3>
              <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="bg-white rounded-[12px] border border-gray-100 overflow-hidden shadow-sm">
                {section.categories.map((subCat, idx) => {
                  const items = WTEs.filter(w => w.subCategory === subCat.id);
                  if (items.length === 0) return null;
                  return (
                    <div key={subCat.id} className={idx > 0 ? "border-t border-gray-100" : ""}>
                      <div className="bg-[#f9f9f9] px-3 py-2 flex justify-between items-center border-b border-gray-50">
                        <span className="text-[10px] font-bold text-[#666] uppercase tracking-wider">{subCat.label}</span>
                        {subCat.iconType === 'leisure' ? <LeisureIcon /> : <BuildingIcon />}
                      </div>
                      <WTEList
                        WTEs={WTEs}
                        items={items}
                        selectedIds={selectedIdsForList}
                        expandedId={expandedId}
                        tierIndexById={tierIndexById}
                        onToggleSelect={toggleSelectWTE}
                        onToggleExpand={toggleExpandWTE}
                        onTierChange={handleTierChange}
                        compact={true}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );

  const renderMobileList = () => {
    const section = WTE_HIERARCHY.find(s => s.id === activeCategory);
    if (!section) return null;
    return (
      <div className="bg-white">
        {section.categories.map((subCat) => {
          const items = WTEs.filter(w => w.subCategory === subCat.id);
          if (items.length === 0) return null;
          return (
            <div key={subCat.id}>
              <div className="bg-[#f9f9f9] px-4 py-2 flex justify-between items-center border-b border-gray-100 mt-0">
                <span className="text-[10px] font-bold text-[#666] uppercase tracking-wider">{subCat.label}</span>
                {subCat.iconType === 'leisure' ? <LeisureIcon /> : <BuildingIcon />}
              </div>
              <WTEList
                WTEs={WTEs}
                items={items}
                selectedIds={selectedIdsForList}
                expandedId={expandedId}
                tierIndexById={tierIndexById}
                onToggleSelect={toggleSelectWTE}
                onToggleExpand={toggleExpandWTE}
                onTierChange={handleTierChange}
              />
            </div>
          );
        })}
      </div>
    );
  };

  if (!current) return <div className="p-6 text-center">Loading selection...</div>;

  return (
    <div className={`${isSplitView ? 'w-full bg-[#F7F7F7] min-h-screen flex flex-col' : 'max-w-md mx-auto pb-[500px] relative bg-white'}`}>
      {renderHeader()}
      <div className={isSplitView ? "max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8 mt-4 md:mt-6 mb-20 flex-grow w-full" : ""}>
        {isSplitView && (
          <h1 className="text-[32px] font-light text-[#323232] mt-4 mb-4" style={{ fontFamily: 'Qantas Sans, sans-serif' }}>
            Earn and use points
          </h1>
        )}
        <div className={isSplitView ? "flex gap-4 xl:gap-8 items-start" : ""}>
          <div className={isSplitView ? "w-[320px] xl:w-[380px] shrink-0 sticky top-6 h-[calc(100vh-48px)] overflow-y-auto pb-20 pr-[10px]" : ""}>
            {isTargetMode && (
              <div className={`${isSplitView ? 'mb-4' : 'px-3 pb-2 bg-gray-100'}`}>
                <div className="bg-white rounded-[12px] p-3 border border-gray-50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-[13px] font-medium text-[#323232]">Target:</span>
                      <img alt="" className="w-[18px] h-[20px]" src="data:image/svg+xml,%3csvg%20width='27'%20height='24'%20viewBox='0%200%2027%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.0576%2023.6163C26.0794%2023.639%2026.1012%2023.639%2026.1232%2023.639C26.167%2023.639%2026.1891%2023.639%2026.2329%2023.5933C26.2764%2023.5476%2026.2764%2023.4564%2026.2329%2023.4107C23.6278%2020.5556%2020.4319%2018.249%2016.8637%2016.7647C15.7692%2016.3078%2015.7692%2016.3078%2015.7692%2016.3078C15.1999%2016.0563%2014.8279%2015.4856%2014.8279%2014.8232C14.8935%2012.3795%2020.4099%2012.882%2020.9791%2011.7171C21.0668%2011.5116%2021.0668%2011.5116%2021.0668%2011.5116C19.9284%2010.4838%2018.5929%209.73024%2017.1046%209.2964C17.0828%209.36483%2017.0387%209.63882%2017.3451%2010.1641C17.6738%2010.7123%2016.9949%2011.603%2015.988%2010.6439C15.9004%2010.5752%2015.9004%2010.5752%2015.9004%2010.5752C8.58908%203.58648%205.21819%208.19991%200.2491%200.0695199C0.20529%200.000828303%200.139698%20-0.0218967%200.0738597%200.0238116C0.00826853%200.0695199%20-0.0137602%200.137953%200.00826853%200.206386C3.92666%2010.0499%2011.9384%207.97163%2012.8797%2017.1528C12.9235%2017.4955%2013.1644%2017.7695%2013.4926%2017.8152C17.9362%2018.546%2022.2707%2020.4645%2026.0358%2023.6163H26.0576'%20fill='%23E40000'/%3e%3c/svg%3e" />
                      <span className="text-[12px] font-medium text-[#323232]">{selectedReward.pts.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-[#999999] uppercase">PTS</span>
                    </div>
                    <div className="bg-[#E1F5F5] px-2 py-1.5 rounded-[6px] flex items-center space-x-1 border border-[#C5EDED]">
                      <span className="text-[12px] font-bold text-[#007A7A]">{ptsLeft.toLocaleString()}</span>
                      <span className="text-[11px] font-bold text-[#007A7A]">left</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E40000] transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>
            )}
            {ONBOARDING_STEPS[onboardingStep] && current?.activeDuoCard === 'onboarding' && (
              <div className={`animate-onboarding-expand ${duoExpanded ? 'expanded mb-4' : ''} ${isSplitView ? '' : 'px-3'}`}>
                <div className={`onboarding-card-content ${duoVisible ? 'visible' : ''} bg-[#E1F5F5] rounded-[16px] p-4 border border-[#C5EDED] flex items-start space-x-3 relative shadow-sm`}>
                  <button onClick={() => updateActiveDuoCard(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  <div className="shrink-0 pt-1"><div className="w-12 h-12 bg-white rounded-[12px] shadow-sm flex items-center justify-center border border-gray-100 p-1.5"><img src={DuoMascot} alt="Duo" className="w-full h-full object-contain" /></div></div>
                  <div className="flex-grow">
                    <div className="text-[14px] font-bold text-[#323232] mb-1 leading-tight">{onboardingStep === 0 ? (totalAnnualPts > 0 ? "Let's earn more points" : "Let's get started!") : ONBOARDING_STEPS[onboardingStep].title}</div>
                    <p className="text-[12px] text-[#666666] leading-relaxed mb-3">{ONBOARDING_STEPS[onboardingStep].text}</p>
                    <button className="bg-white border border-gray-100 text-[11px] font-bold text-[#E40000] px-4 py-2 rounded-lg hover:bg-gray-50 transition-all active:scale-95 uppercase tracking-[0.15em] shadow-sm" onClick={handleOnboardingAction}>{ONBOARDING_STEPS[onboardingStep].buttonLabel}</button>
                  </div>
                </div>
              </div>
            )}
            {isSplitView ? renderSplitViewSections() : (
              <>
                <div className="pt-2 bg-gray-100">
                  <CategoryTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} ref={tabsRef} variant="default" />
                </div>
                {renderMobileList()}
              </>
            )}
          </div>
          {isSplitView && (
            <div ref={rewardsContainerRef} className="flex-grow min-w-0 bg-white rounded-[24px] p-4 shadow-sm">
              <RewardsScreen goTo={goTo} isEmbedded={true} desktopMode={isSplitView} containerRef={rewardsContainerRef} />
            </div>
          )}
        </div>
      </div>
      {isSplitView && <Footer />}
      {isMobile && selectedWTEs.length > 0 && (
        <StickyFooter totalPts={totalAnnualPts} selectedReward={selectedReward} hasSelectedReward={current.hasSelectedReward} onExploreRewardsClicked={handleSeeMoreClick} onHomepageClicked={handleAddToDashboard} initialMinimized={isTargetMode} />
      )}
      {isSplitView && selectedWTEs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 flex justify-end items-center z-[9000]" style={{ paddingTop: '6px', paddingBottom: '6px' }}>
          <span className="mr-6 text-[12px] text-gray-700">Add the selected ways to earn and reward to your homepage to continue.</span>
          <button onClick={handleAddToDashboard} className="bg-[#E40000] text-white font-bold text-[12px] px-8 py-3 rounded-[4px] tracking-wider hover:bg-red-700 uppercase" style={{ paddingTop: '6px', paddingBottom: '6px' }}>Go to Homepage</button>
        </div>
      )}
    </div>
  );
}
