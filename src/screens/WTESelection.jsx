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
  entertainmentList,
  calculateGroundSC
} from '../data';
import CategoryTabs from '../components/CategoryTabs';
import WTEList from '../components/WTEList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyFooter from '../components/StickyFooter';
import RewardsScreen from './RewardsScreen'; // Import RewardsScreen
import PointsRooLogo from '../assets/points-roo.svg';
import { useViewportMode } from '../hooks/useViewportMode';
import KoalaSprite from '../components/KoalaSprite';
import FlightsLogo from '../assets/logos/flights.svg';
import EarnExampleScreen from './EarnExampleScreen';

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
    buttonLabel: "Help me"
  },
  {
    title: "Ways to earn",
    text: "There are three main ways to earn in the program. We can take a look at each one-by-one.",
    buttonLabel: "OK"
  },
  {
    title: "Earn with Travel",
    text: "Earn Qantas Points and Status Credits on flights. And earn more by booking more of your travel with us!",
    buttonLabel: "Next"
  },
  {
    title: "Tick it if you like it",
    text: "Tick the ways of earning that you think you might be able to use. These will save to Your Account For You page.",
    buttonLabel: "Next"
  },
  {
    title: "Adjust how much",
    text: "You can adjust how much you might use this way of earning from a little to a lot.",
    buttonLabel: "Next"
  },
  {
    title: "Target how much",
    text: "The setting you choose for how much you might earn becomes a target. You can track towards this each month.",
    buttonLabel: "Next"
  },
  {
    title: "Shop everyday",
    text: "The shop category has all kinds of everyday shopping, online, lifestyle and utilities.",
    buttonLabel: "Next"
  },
  {
    title: "Big point bonuses",
    text: "The Banking and Insurance category is an important way of unlocking significant rewards.",
    buttonLabel: "Next"
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

const SC_GOALS = [0, 300, 700, 1400, 3600];
const SC_NAMES = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Platinum One'];

const toTitleCase = (str) => {
  const map = {
    'FLIGHTS': 'Flights',
    'HOLIDAYS, ACTIVITIES & EXPERIENCES': 'Holidays, Activities & Experiences',
    'HOTELS & ACCOMMODATION': 'Hotels & Accommodation',
    'GROUND TRANSPORTATION': 'Ground Transportation',
    'EVERYDAY SHOPPING': 'Everyday Shopping',
    'LIFESTYLE RETAIL & ENTERTAINMENT': 'Lifestyle Retail & Entertainment',
    'Home Utilities': 'Home Utilities',
    'CARDS & BANKING': 'Cards & Banking',
    'BANKING & HOMELOANS': 'Banking & Homeloans',
    'INSURANCE': 'Insurance'
  };
  return map[str] || str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const CategoryHeader = ({ subCat, categoryPts, isGround }) => {
  const displayName = toTitleCase(subCat.label);
  const isFull = categoryPts >= 1000;
  const progressPercent = Math.min(100, (categoryPts / 1000) * 100);
  const scAmount = ['utilities', 'cards', 'homeloans', 'insurance'].includes(subCat.id) ? 20 : 10;

  return (
    <div className="bg-white px-4 py-4 flex items-start gap-4">
      {/* Icon Box */}
      <div className={`rounded-[16px] bg-[#fdfdfd] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300 ${categoryPts === 0 ? 'w-[36px] h-[36px]' : 'w-[52px] h-[52px]'}`}>
        <div className={categoryPts === 0 ? 'scale-[0.65]' : 'scale-100'}>
          {subCat.iconType === 'leisure' ? <LeisureIcon /> : <BuildingIcon />}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 min-w-0 pt-[2px]">
        <h4 className={`text-[14px] xl:text-[12px] font-medium text-[#323232] truncate leading-tight tracking-tight transition-all duration-300 ${categoryPts === 0 ? 'mb-0 translate-y-1.5' : 'mb-1.5'}`}>
          {displayName}
        </h4>

        {isGround ? (
          <div>
            {categoryPts > 0 && (
              <>
                {/* Progress Bar */}
                <div className="w-full h-[6px] bg-[#EAEAEA] rounded-full mb-2 overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${isFull ? 'bg-[#00a600]' : 'bg-[#E40000]'}`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                {/* Bar Labels */}
                <div className="flex justify-between items-center text-[10px] xl:text-[12px]">
                  {isFull ? (
                    <div className="w-full flex items-center font-medium tracking-wide text-[#00a600]">
                      <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1.447l-1 1-1-1V5a1 1 0 00-1-1H7a1 1 0 00-1 1v.447l-1 1-1-1V4zm0 2h1v1.447l-1 1V6zM3 8a1 1 0 00-1 1v2h16V9a1 1 0 00-1-1H3zm2 4v4h10v-4h2v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5h2z" />
                      </svg>
                      {scAmount} Status Credits earned!
                    </div>
                  ) : (
                    <>
                      <span className="font-medium tracking-wide text-[#323232]">{categoryPts.toLocaleString()} / 1,000 PTS</span>
                      <span className="font-medium tracking-wide text-[#666] flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1 text-[#888]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1.447l-1 1-1-1V5a1 1 0 00-1-1H7a1 1 0 00-1 1v.447l-1 1-1-1V4zm0 2h1v1.447l-1 1V6zM3 8a1 1 0 00-1 1v2h16V9a1 1 0 00-1-1H3zm2 4v4h10v-4h2v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5h2z" />
                        </svg>
                        {scAmount} Status Credits
                      </span>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          categoryPts > 0 && (
            <div className="text-[10px] xl:text-[12px] font-medium tracking-wide text-[#666] mt-2 flex items-center">
              <svg className="w-3.5 h-3.5 mr-1.5 text-[#666]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Status Credits earned on every flight
            </div>
          )
        )}
      </div>
    </div>
  );
};

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
  const onboardingCardRef = useRef(null);
  const [collapsedCategories, setCollapsedCategories] = useState(new Set());
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [duoExpanded, setDuoExpanded] = useState(false);
  const [duoVisible, setDuoVisible] = useState(false);
  const [userInteractedWithSlider, setUserInteractedWithSlider] = useState(false);
  const [showEarnExample, setShowEarnExample] = useState(false);

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

  const isTargetMode = Boolean(current?.hasSelectedReward && selectedReward && totalAnnualPts < selectedReward.pts);
  const ptsLeft = selectedReward ? Math.max(0, selectedReward.pts - totalAnnualPts) : 0;
  const progressPercent = selectedReward
    ? Math.min(100, Math.max(0, (totalAnnualPts / selectedReward.pts) * 100))
    : 0;

  const favouriteTierIndex = current?.favouriteTierIndex ?? null;
  const flightTierIndex = tierIndexById[22] ?? 0;

  const groundSC = useMemo(() => calculateGroundSC(selectedWTEs), [selectedWTEs]);

  const isSCTargetMode = favouriteTierIndex !== null && flightTierIndex < favouriteTierIndex;
  const targetSC = favouriteTierIndex !== null ? SC_GOALS[favouriteTierIndex] : 0;
  const currentSC = SC_GOALS[flightTierIndex] + groundSC;
  const scLeft = Math.max(0, targetSC - currentSC);
  const scProgressPercent = targetSC > 0 ? Math.min(100, (currentSC / targetSC) * 100) : 0;

  const flightsPts = useMemo(() => {
    const flightWTE = WTEs.find(w => w.id === 22);
    const tierIdx = tierIndexById[22] ?? 2;
    return flightWTE ? (flightWTE.tiers[tierIdx]?.pts ?? 12000) : 12000;
  }, [tierIndexById]);
  const flightsMonthlyTarget = Math.round(flightsPts / 12);
  const earnedThisMonth = 500;
  const trackerPercent = Math.min(100, (earnedThisMonth / flightsMonthlyTarget) * 100);
  const trackerCircumference = 2 * Math.PI * 38;
  const trackerStrokeDashoffset = trackerCircumference - (trackerPercent / 100) * trackerCircumference;

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-key="${activeCategory}"]`);
    if (!btn) return;
    const cw = container.offsetWidth;
    const center = btn.offsetLeft + btn.offsetWidth / 2;
    container.scrollTo({ left: center - cw / 2, behavior: 'smooth' });
  }, [activeCategory]);

  const handleTierChangeRef = useRef(null);

  // Auto-slide effect for onboarding step 4
  useEffect(() => {
    if (onboardingStep !== 4 || current?.activeDuoCard !== 'onboarding' || userInteractedWithSlider) return;

    let isCancelled = false;
    let timerId = null;
    let currentTier = 2; // Initial position after step 3 is '2'
    let direction = -1; // -1 means moving left, 1 means right

    const playSlider = () => {
      if (isCancelled) return;

      currentTier += direction;
      if (handleTierChangeRef.current) {
        handleTierChangeRef.current(22, currentTier, true);
      }

      if (currentTier <= 0) {
        currentTier = 0;
        direction = 1;
        timerId = setTimeout(playSlider, 1500); // 1.5s total = 500ms normal step + 1s hold
      } else if (currentTier >= 4) {
        currentTier = 4;
        direction = -1;
        timerId = setTimeout(playSlider, 1500);
      } else {
        timerId = setTimeout(playSlider, 400); // Move "not too fast"
      }
    };

    timerId = setTimeout(playSlider, 1000); // Initial hold before starting movement

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
    };
  }, [onboardingStep, current?.activeDuoCard, userInteractedWithSlider]);

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

  const handleTierChange = useCallback((id, idx, isAuto = false) => {
    if (!isAuto && onboardingStep === 4) {
      setUserInteractedWithSlider(true);
    }
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
  }, [current, updateTierIndex, updateSelectedWTEs, onboardingStep]);

  // Keep a fresh reference for the auto-slider logic
  useEffect(() => {
    handleTierChangeRef.current = handleTierChange;
  }, [handleTierChange]);

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
      if (isSplitView) {
        setCollapsedCategories(prev => {
          const next = new Set(prev);
          next.delete('travel');
          return next;
        });
      }
      setOnboardingStep(2);
    } else if (onboardingStep === 2) {
      // Step 2 > Step 3 Transition
      // Demonstrate by selecting 'Qantas & Partner Flights' (id: 22)
      const currWTEs = current?.selectedWTEs || [];
      const hasFlights = currWTEs.some(w => String(w.id) === '22');
      if (!hasFlights) {
        const newSelection = [...currWTEs, { id: 22, level: '2' }]; // Default to middle tier
        updateSelectedWTEs(newSelection);
      }
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 3) {
      // Step 3 > Step 4 Transition
      // Demonstrate by opening 'Qantas & Partner Flights' card
      if (expandedId !== 22) {
        setExpandedId(22);
      }
      setTimeout(() => {
        onboardingCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 4) {
      // Step 4 > Step 5 Transition ("Choose a reward")
      if (isSplitView && rewardsContainerRef.current) {
        // Scroll the right column container into view
        rewardsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 5) {
      if (isSplitView) {
        setCollapsedCategories(prev => {
          const next = new Set(prev);
          next.add('travel');
          next.delete('shop');
          return next;
        });
      } else {
        setActiveCategory('shop');
      }
      setTimeout(() => {
        onboardingCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 6) {
      if (isSplitView) {
        setCollapsedCategories(prev => {
          const next = new Set(prev);
          next.add('shop');
          next.delete('banking');
          return next;
        });
      } else {
        setActiveCategory('banking');
      }
      setTimeout(() => {
        onboardingCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep < ONBOARDING_STEPS.length - 1) {
      setOnboardingStep(prev => prev + 1);
    } else {
      updateActiveDuoCard(null);
    }
  }, [onboardingStep, isSplitView, categories, updateSelectedWTEs, updateActiveDuoCard, current, expandedId]);

  const selectedIdsForList = useMemo(() => selectedWTEs.map(w => w.id), [selectedWTEs]);

  const renderHeader = () => (
    <Header
      isMobile={isMobile}
      goTo={goTo}
      currentStepIndex={currentStepIndex}
      onProfileClick={() => goTo(0)}
      activeTab="Earn and use points"
      onTabClick={(tab) => {
        if (tab === 'For you') goTo(5);
      }}
    />
  );

  const toggleCategory = useCallback((key) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const renderSplitViewSections = () => {
    const allCollapsed = WTE_HIERARCHY.every(s => collapsedCategories.has(s.id));
    const shouldAnimateBounce = onboardingStep === 1 && current?.activeDuoCard === 'onboarding' && allCollapsed;

    return (
      <div className="space-y-4">
        {WTE_HIERARCHY.map((section, idx) => {
          const isCollapsed = collapsedCategories.has(section.id);
          return (
            <section key={section.id} className={shouldAnimateBounce ? `animate-seq-bounce delay-${idx}` : ''}>
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

                    const isGround = subCat.id !== 'flights';
                    const categoryPts = items.reduce((sum, w) => {
                      const sel = selectedWTEs.find(s => s.id === w.id);
                      if (sel) {
                        const tierIdx = parseInt(sel.level, 10);
                        return sum + (w.tiers[tierIdx]?.pts || 0);
                      }
                      return sum;
                    }, 0);

                    return (
                      <div key={subCat.id} className={idx > 0 ? "border-t border-gray-100" : ""}>
                        <CategoryHeader subCat={subCat} categoryPts={categoryPts} isGround={isGround} />
                        <WTEList
                          WTEs={WTEs}
                          items={items}
                          selectedIds={selectedIdsForList}
                          expandedId={expandedId}
                          tierIndexById={tierIndexById}
                          onToggleSelect={toggleSelectWTE}
                          onToggleExpand={toggleExpandWTE}
                          onTierChange={handleTierChange}
                          onToggleEarnExample={() => {
                            if (showEarnExample) {
                              setShowEarnExample(false);
                            } else {
                              setShowEarnExample(true);
                              if (isSplitView) {
                                setTimeout(() => {
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }, 100);
                              }
                            }
                          }}
                          isEarnExampleOpen={showEarnExample}
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
  };

  const renderMobileList = () => {
    const section = WTE_HIERARCHY.find(s => s.id === activeCategory);
    if (!section) return null;
    return (
      <div className="bg-white">
        {section.categories.map((subCat, idx) => {
          const items = WTEs.filter(w => w.subCategory === subCat.id);
          if (items.length === 0) return null;

          const isGround = subCat.id !== 'flights';
          const categoryPts = items.reduce((sum, w) => {
            const sel = selectedWTEs.find(s => s.id === w.id);
            if (sel) {
              const tierIdx = parseInt(sel.level, 10);
              return sum + (w.tiers[tierIdx]?.pts || 0);
            }
            return sum;
          }, 0);

          return (
            <div key={subCat.id} className={`mt-2 ${idx > 0 ? "border-t border-gray-100" : ""}`}>
              <CategoryHeader subCat={subCat} categoryPts={categoryPts} isGround={isGround} />
              <WTEList
                WTEs={WTEs}
                items={items}
                selectedIds={selectedIdsForList}
                expandedId={expandedId}
                tierIndexById={tierIndexById}
                onToggleSelect={toggleSelectWTE}
                onToggleExpand={toggleExpandWTE}
                onTierChange={handleTierChange}
                onToggleEarnExample={() => {
                  if (showEarnExample) {
                    setShowEarnExample(false);
                  } else {
                    setShowEarnExample(true);
                    if (isSplitView) {
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }
                  }
                }}
                isEarnExampleOpen={showEarnExample}
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

        {/* Selected WTE Chips */}
        {selectedWTEs.length > 0 && (
          <div className="flex overflow-x-auto pb-4 gap-2 mb-2 no-scrollbar px-4 -mx-4 md:px-0 md:mx-0">
            {selectedWTEs.map(w => {
              const fullWTE = WTEs.find(item => item.id === w.id);
              if (!fullWTE) return null;
              return (
                <button
                  key={w.id}
                  onClick={() => toggleSelectWTE(w.id)}
                  className="group flex items-center whitespace-nowrap px-3.5 py-[5px] bg-[#E1F5F5] hover:bg-white text-[#494A62] text-[13px] md:text-[12px] font-medium rounded-[8px] shrink-0 border border-transparent hover:border-[#D4D4E4] transition-colors cursor-pointer"
                  aria-label={`Deselect ${fullWTE.name}`}
                >
                  <svg className="w-[12px] h-[12px] md:w-[11px] md:h-[11px] mr-2 stroke-[3px] group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.5l4 4L19.5 7" />
                  </svg>
                  {fullWTE.name}
                  <svg className="w-[12px] h-[12px] md:w-[11px] md:h-[11px] ml-2 stroke-[3px] hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              );
            })}
          </div>
        )}
        <div className={isSplitView ? "flex gap-4 xl:gap-8 items-start" : ""}>
          <div className={isSplitView ? "w-[320px] xl:w-[380px] shrink-0 sticky top-6 h-[calc(100vh-48px)] overflow-y-auto pb-20 pr-[10px]" : ""}>
            {!isSplitView && isSCTargetMode && (
              <div className={`${isSplitView ? 'mb-4' : 'px-3 pb-2 bg-gray-100'}`}>
                <div className="bg-white rounded-[12px] p-3 border border-gray-50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-[13px] font-medium text-[#323232]">Tier Target:</span>
                      <span className="text-[13px] font-bold text-[#E40000] ml-1">{SC_NAMES[favouriteTierIndex]}</span>
                      <span className="text-[14px] font-bold text-[#E40000] ml-1.5 mr-0.5">★</span>
                      <span className="text-[14px] font-bold text-[#323232]">{targetSC.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-[#999999] uppercase ml-1">SC</span>
                    </div>
                    <div className="bg-[#FFF1F1] px-2 py-1.5 rounded-[6px] flex items-center space-x-1 border border-[#FED7D7]">
                      <span className="text-[12px] font-bold text-[#E40000]">{scLeft.toLocaleString()}</span>
                      <span className="text-[11px] font-bold text-[#E40000]">left</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E40000] transition-all duration-500 ease-out" style={{ width: `${scProgressPercent}%` }} />
                  </div>
                </div>
              </div>
            )}
            {!isSplitView && isTargetMode && (
              <div className={`${isSplitView ? 'mb-4' : 'px-3 pb-2 bg-gray-100'}`}>
                <div className="bg-white rounded-[12px] p-3 border border-gray-50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-[13px] font-medium text-[#323232]">Reward Target:</span>
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
              <div ref={onboardingCardRef} className={`animate-onboarding-expand ${duoExpanded ? 'expanded mb-4' : ''} ${isSplitView ? '' : 'px-3'}`}>
                <div className={`onboarding-card-content ${duoVisible ? 'visible' : ''}`}>
                  <div className={`bg-[#E2F1F0] ${onboardingStep === 5 ? 'rounded-t-[16px]' : 'rounded-[16px]'} p-5 flex items-center space-x-4 relative overflow-hidden transition-all duration-300`}>
                    <button onClick={() => updateActiveDuoCard(null)} className="absolute top-1.5 right-1.5 p-1 text-gray-500 hover:text-gray-700 transition-colors z-10" style={{ marginRight: 0, top: 4, right: 4 }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="shrink-0 relative z-10" style={{ width: '130px', height: '140px' }}>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                        <KoalaSprite variant={['down', 'ah', 'travel', 'tick', 'big', 'map', 'shop', 'card'][onboardingStep] || 'idle'} scale={0.55} className="origin-bottom" />
                      </div>
                    </div>
                    <div className="flex-grow pr-4 z-10 pb-1">
                      <div className="text-[18px] text-[#222222] font-medium mb-1.5 leading-tight">{onboardingStep === 0 ? (totalAnnualPts > 0 ? "Let's earn more points" : "Let's get started!") : ONBOARDING_STEPS[onboardingStep].title}</div>
                      <p className="text-[13px] text-[#222222] leading-[1.3] mb-4">{ONBOARDING_STEPS[onboardingStep].text}</p>
                      <button className="bg-white text-[13px] font-bold text-[#E40000] px-5 py-2 rounded-full hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap" onClick={handleOnboardingAction} style={{ minWidth: '100px' }}>
                        {ONBOARDING_STEPS[onboardingStep].buttonLabel}
                      </button>
                    </div>
                  </div>
                  {onboardingStep === 5 && (
                    <div className="bg-white rounded-b-[16px] px-6 py-5 shadow-sm flex items-center justify-between relative z-20">
                      <div className="flex flex-col h-full justify-between w-[110px] gap-3">
                        <div className="font-bold text-[13px] text-[#222] leading-tight pr-2">Qantas &amp; Partner Flights</div>
                        <div>
                          <div className="text-[12px] font-medium text-[#222]">{flightsPts.toLocaleString()} pts</div>
                          <div className="text-[11px] font-bold text-[#222] uppercase tracking-tight">Annual Target</div>
                        </div>
                      </div>
                      <div className="relative flex-grow flex justify-center -translate-y-[2px]">
                        <svg width="86" height="86" viewBox="0 0 96 96" className="-rotate-90">
                          <circle cx="48" cy="48" r="38" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                          <circle cx="48" cy="48" r="38" stroke="#E40000" strokeWidth="6" fill="none" strokeDasharray={trackerCircumference} strokeDashoffset={trackerStrokeDashoffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1.5">
                          <img src={FlightsLogo} alt="Flight" className="w-[30px] h-[30px] mb-[2px] -translate-x-[2px] translate-y-[0px] opacity-80" />
                          <div className="w-[36px] h-[1px] bg-gray-300"></div>
                          <span className="text-[10px] text-[#666] mt-[2px]">{flightsMonthlyTarget.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col h-full justify-between items-end text-right w-[110px] gap-3">
                        <div>
                          <div className="text-[11px] font-bold text-[#222] uppercase tracking-tight">Monthly Target</div>
                          <div className="text-[12px] font-medium text-[#222] mt-[2px]">{flightsMonthlyTarget.toLocaleString()} pts</div>
                        </div>
                        <div>
                          <div className="text-[12px] font-medium text-[#222]">{earnedThisMonth.toLocaleString()} pts</div>
                          <div className="text-[11px] font-bold text-[#222] uppercase tracking-tight mt-[0px]">Earned this month:</div>
                        </div>
                      </div>
                    </div>
                  )}
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
            <div ref={rewardsContainerRef} className="flex-grow min-w-0 bg-white rounded-[24px] shadow-sm relative overflow-hidden flex flex-col items-stretch outline-none ring-[1px] ring-gray-200">
              {showEarnExample && expandedId ? (
                <EarnExampleScreen
                  wte={WTEs.find(w => w.id === expandedId)}
                  tierIdx={tierIndexById[expandedId] ?? 0}
                  onClose={() => setShowEarnExample(false)}
                />
              ) : (
                <div className="w-full h-full p-4 overflow-y-auto">
                  <RewardsScreen goTo={goTo} isEmbedded={true} desktopMode={isSplitView} containerRef={rewardsContainerRef} />
                </div>
              )}
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
