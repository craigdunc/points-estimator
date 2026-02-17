// src/screens/RewardsScreen.jsx
import React, {
  useState,
  useMemo,
  useCallback
} from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import ConnectedRewardCard from '../components/ConnectedRewardCard';
import {
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList,
  ORIGIN_CITY
} from '../data';
import CategoryTabs from '../components/CategoryTabs';
import PointsRooLogo from '../assets/points-roo.svg';
import LeafletMap from '../components/LeafletMap';
import RewardCard from '../components/RewardCard';
import DuoMascot from '../assets/icons/duo.png';

// Reward tab config
const rewardTabsConfig = [
  { key: 'Flights', label: 'REWARD FLIGHTS' },
  { key: 'Hotels', label: 'QANTAS HOTELS' },
  { key: 'Activities', label: 'QANTAS ACTIVITIES' },
  { key: 'Marketplace', label: 'MARKETPLACE' },
  { key: 'Gift Cards', label: 'GIFT CARDS' },
  { key: 'Entertainment', label: 'ENTERTAINMENT' },
];
const rewardTabKeys = rewardTabsConfig.map(t => t.key);

// Combine lists into a map
const useRewardsMap = () =>
  useMemo(
    () => ({
      Flights: flightsList,
      Hotels: hotelsList,
      Activities: activitiesList,
      Marketplace: marketplaceList,
      'Gift Cards': giftCardsList,
      Entertainment: entertainmentList
    }),
    []
  );

export default function RewardsScreen({ goTo, isEmbedded = false, desktopMode = false, containerRef = null }) {
  const { current, updateSelectedWTU, updateSelectedRewardId } = useSaveSlots();
  const rewardsMap = useRewardsMap();

  // Global state
  const totalAnnualPts = current?.totalAnnualPts ?? 0;
  const activeTabKey = current?.selectedWTU ?? rewardTabKeys[0];
  const globalSelectedRewardId = current?.selectedRewardId ?? null;
  const globalSelectedRewardCategory = current?.selectedRewardCategory ?? null;

  // Build flightPoints array for map (just flat list of flights)
  const flightPoints = useMemo(
    () => flightsList
      .filter(f => f.destCoords)
      .map(f => ({ ...f, lon: f.destCoords.lon, lat: f.destCoords.lat })),
    []
  );

  // Affordable flights for map
  const affordableFlightIds = useMemo(
    () => flightsList.filter(f => f.pts <= totalAnnualPts).map(f => f.id),
    [totalAnnualPts]
  );

  // All rewards for list view (sorted: affordable first, then unaffordable)
  const allRewards = useMemo(
    () => {
      const rewards = rewardsMap[activeTabKey] || [];
      return [...rewards].sort((a, b) => {
        const aAffordable = a.pts <= totalAnnualPts;
        const bAffordable = b.pts <= totalAnnualPts;
        if (aAffordable && !bAffordable) return -1;
        if (!aAffordable && bAffordable) return 1;
        return a.pts - b.pts;
      });
    },
    [activeTabKey, totalAnnualPts, rewardsMap]
  );

  // UI state
  const [expandedId, setExpandedId] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [pendingRewardId, setPendingRewardId] = useState(null);
  const [pendingRewardCategory, setPendingRewardCategory] = useState(null);
  // Track if user has manually clicked/interacted with a reward
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // Handlers
  const handleTabChange = useCallback(key => {
    updateSelectedWTU(key);
    setExpandedId(null);
    // Clear pending state when switching tabs to avoid "ghost" highlights
    setPendingRewardId(null);
    setPendingRewardCategory(null);
    setShowRewardModal(false);
  }, [updateSelectedWTU]);

  const handleToggleExpand = useCallback(id => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  const handleSelectRewardOnMap = useCallback(id => {
    // Check affordability
    const reward = flightPoints.find(r => r.id === id);
    const isAffordable = reward && reward.pts <= totalAnnualPts;

    // Always update the selected reward to reflect the user's latest choice
    updateSelectedRewardId(id, 'Flights', true);
    setUserHasInteracted(true);

    if (isAffordable) {
      // Clear any pending modal state
      setPendingRewardId(null);
      setPendingRewardCategory(null);
      setShowRewardModal(false);
    } else {
      // Unaffordable - set pending for Duo guidance
      setPendingRewardId(id);
      setPendingRewardCategory('Flights');

      // Animated transition: scroll to top first
      if (desktopMode && containerRef?.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }

      setTimeout(() => {
        setShowRewardModal(true);
      }, desktopMode ? 800 : 400);
    }
  }, [flightPoints, totalAnnualPts, updateSelectedRewardId, desktopMode, containerRef]);

  const handleSelectRewardInList = useCallback((id) => {
    // Check affordability
    const list = rewardsMap[activeTabKey] || [];
    const reward = list.find(r => r.id === id);
    const isAffordable = reward && reward.pts <= totalAnnualPts;

    // Always update the selected reward to reflect the user's latest choice
    updateSelectedRewardId(id, activeTabKey, true);
    setUserHasInteracted(true);

    if (isAffordable) {
      // If affordable, select it immediately as explicit favourite
      setPendingRewardId(null);
      setPendingRewardCategory(null);
      setShowRewardModal(false);
    } else {
      setPendingRewardId(id);
      setPendingRewardCategory(activeTabKey);

      // Animated transition: scroll to top first
      if (desktopMode && containerRef?.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }

      setTimeout(() => {
        setShowRewardModal(true);
      }, desktopMode ? 800 : 400);
    }
  }, [activeTabKey, rewardsMap, totalAnnualPts, updateSelectedRewardId, desktopMode, containerRef]);

  const handleCloseModal = useCallback(() => {
    setShowRewardModal(false);
    setPendingRewardId(null);
    setPendingRewardCategory(null);
  }, []);

  const handleShowMe = useCallback(() => {
    // First, set the selected reward
    if (pendingRewardId && pendingRewardCategory) {
      updateSelectedRewardId(pendingRewardId, pendingRewardCategory, true);
    }
    // Then navigate to WTE selection (step 3) (Should probably update this to handle combined view?)
    if (!isEmbedded) goTo(3);
  }, [pendingRewardId, pendingRewardCategory, updateSelectedRewardId, goTo, isEmbedded]);

  const handleConfirmFavourite = useCallback(() => {
    // Confirm the currently selected reward (globalSelectedRewardId) as explicit
    if (globalSelectedRewardId && globalSelectedRewardCategory) {
      updateSelectedRewardId(globalSelectedRewardId, globalSelectedRewardCategory, true);
    }
    // Navigate back
    if (!isEmbedded) goTo(3);
  }, [globalSelectedRewardId, globalSelectedRewardCategory, updateSelectedRewardId, goTo, isEmbedded]);

  const handleGoBack = useCallback(() => !isEmbedded && goTo(3), [goTo, isEmbedded]);

  const selectedRewardObj = useMemo(() => {
    const cat = globalSelectedRewardCategory || activeTabKey;
    const list = rewardsMap[cat] || [];
    return list.find(r => r.id === globalSelectedRewardId) || null;
  }, [rewardsMap, activeTabKey, globalSelectedRewardId, globalSelectedRewardCategory]);

  // Get the pending reward object for the modal
  const pendingRewardObj = useMemo(() => {
    if (!pendingRewardId || !pendingRewardCategory) return null;
    const list = rewardsMap[pendingRewardCategory] || [];
    return list.find(r => r.id === pendingRewardId) || null;
  }, [rewardsMap, pendingRewardId, pendingRewardCategory]);

  const isSelectedAffordable = useMemo(() => {
    return selectedRewardObj ? selectedRewardObj.pts <= totalAnnualPts : false;
  }, [selectedRewardObj, totalAnnualPts]);

  if (!current) return <div className="p-6 text-center">Loading rewards...</div>;

  const renderMapSection = () => {
    if (activeTabKey !== 'Flights') return null;
    const mapShellClass = desktopMode
      ? 'relative border border-gray-200 rounded-[12px] overflow-hidden h-[340px] lg:h-[380px] bg-white'
      : 'flex-grow relative border-t border-b border-gray-200';
    return (
      <div className={mapShellClass}>
        <LeafletMap
          flights={flightPoints}
          origin={ORIGIN_CITY.coords}
          selectedFlightId={globalSelectedRewardId}
          pendingFlightId={pendingRewardId}
          affordableIds={affordableFlightIds}
          onFlightClick={handleSelectRewardOnMap}
          isSelectionExplicit={current.hasSelectedReward || userHasInteracted}
        />
      </div>
    );
  };

  const renderSelectedRewardPreview = () => {
    const cat = globalSelectedRewardCategory || activeTabKey;
    const list = rewardsMap[cat] || [];
    const sel = list.find(r => r.id === globalSelectedRewardId);

    if (!sel) return (
      <div className="p-6 text-gray-400 text-center text-xs border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
        Choose a reward from the {activeTabKey === 'Flights' ? 'map' : 'list'} above.
      </div>
    );

    return <ConnectedRewardCard key={globalSelectedRewardId || 'none'} reward={sel} />;
  };

  const renderDesktopGuidance = () => {
    if (!showRewardModal || !pendingRewardObj) return null;
    return (
      <div className="w-full animate-duo-entrance">
        <div className="bg-[#E1F5F5] rounded-[14px] p-3 border border-[#C5EDED] flex items-start space-x-3 relative h-full shadow-sm">
          <button
            onClick={() => setShowRewardModal(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="shrink-0">
            <div className="w-12 h-12 bg-white rounded-[12px] shadow-sm flex items-center justify-center border border-gray-100 p-1.5">
              <img src={DuoMascot} alt="Duo mascot" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="flex-grow pt-0.5">
            <div className="text-[13px] text-[#323232] mb-0.5 leading-tight pr-6">
              This reward is <span className="font-bold text-[14px]">{pendingRewardObj.pts.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-[#999999] ml-1 uppercase">PTS</span>
            </div>
            <p className="text-[12px] text-[#666666] leading-relaxed mb-2.5">
              I'll show you how you can earn the points, in one year.
            </p>
            <button
              onClick={handleShowMe}
              className="px-3 py-1.5 bg-[#E40000] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors active:scale-95"
            >
              Show me how
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDesktopHeaderContent = () => (
    <div className="mb-6 flex flex-col space-y-3">
      {/* Full-width Estimated Line */}
      <div className="w-full text-left">
        <span className="text-[12px] text-[#323232]">Estimated</span>
        <img src={PointsRooLogo} alt="" className="w-[14px] h-[16px] translate-y-0.5 inline mx-1" />
        <span className="text-[14px] font-bold text-[#323232]">
          {totalAnnualPts.toLocaleString()}
        </span>
        <span className="text-[9px] font-bold text-[#999999] uppercase ml-1">PTS</span>
        <span className="text-[12px] text-[#323232] ml-1">a year from selected</span>
      </div>

      {/* Grid: Stacks on Tablet (<1200px), Side-by-Side on Desktop (>=1200px) */}
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 items-stretch">
        <div className="flex flex-col max-w-[320px] w-full">
          <div className="mb-2 text-[12px] text-gray-700">
            {current.hasSelectedReward ? 'Favourite reward' : 'Example reward'}
          </div>
          <div className="flex-grow">
            {renderSelectedRewardPreview()}
          </div>
        </div>

        <div className="flex flex-col max-w-[320px] w-full">
          {/* Label spacer only shown on desktop (xl) where side-by-side relies on it for alignment */}
          <div className="mb-2 h-[18px] hidden xl:block"></div>
          <div className="flex-grow">
            {renderDesktopGuidance()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${isEmbedded ? 'w-full' : 'fixed inset-0 bg-white z-40 flex flex-col h-full overflow-hidden'}`}>
      {/* Header - Only hide if embedded AND not desktop (or handled by parent) */}
      {!isEmbedded && (
        <div className="bg-white shadow-sm p-4 py-4 flex items-center shrink-0">
          <button onClick={handleGoBack} className="mr-4 text-gray-500 hover:text-red-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-[19px] font-medium text-[#323232]">
            Ways to use points
          </h1>
          <div className="flex-grow text-right">
            <button className="text-gray-400">
              <svg className="w-6 h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v-4m0-4h.01" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Top Section */}
      {desktopMode && (
        <div className="px-0 pt-0 shrink-0">
          {renderDesktopHeaderContent()}
        </div>
      )}

      {/* Tabs */}
      <div className={`shrink-0 py-0 border-b border-gray-100 bg-white ${isEmbedded ? '' : ''}`}>
        <CategoryTabs
          categories={rewardTabsConfig}
          activeCategory={activeTabKey}
          onCategoryChange={handleTabChange}
        />
      </div>

      {/* Main Content (Map or List) */}
      <div className={`${isEmbedded ? 'w-full bg-gray-50' : 'flex-grow flex flex-col min-h-0 overflow-y-auto bg-gray-50'}`}>
        {activeTabKey === 'Flights' ? (
          renderMapSection()
        ) : (
          <div>
            {allRewards.map(r => {
              const isExpanded = expandedId === r.id;
              // Category-aware selection check
              const isSelected = globalSelectedRewardId === r.id && globalSelectedRewardCategory === activeTabKey;
              const isPending = pendingRewardId === r.id && pendingRewardCategory === activeTabKey;
              const isAffordable = r.pts <= totalAnnualPts;

              return (
                <div key={r.id} className={`border-b border-gray-100 transition-colors duration-300 
                  ${isExpanded || isSelected || isPending ? 'bg-[#EEF7F8]' : isAffordable ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                  {/* Header Row */}
                  <div
                    className={`flex items-center cursor-pointer hover:bg-[#EEF7F8]/50 transition-colors group ${desktopMode ? 'py-2 px-3' : 'p-4'}`}
                    onClick={() => handleSelectRewardInList(r.id)}
                  >
                    {/* Selection Indicator / Icon Area */}
                    <div
                      className={`${desktopMode ? 'w-7 h-7 mr-3' : 'w-10 h-10 mr-4'} flex-shrink-0 flex items-center justify-center relative`}
                    >
                      {(isSelected || isPending) ? (
                        <div className={`${desktopMode ? 'w-[24px] h-[24px]' : 'w-10 h-10'} rounded-full flex items-center justify-center shadow-md animate-in fade-in zoom-in duration-200 ${isAffordable ? 'bg-[#E40000]' : 'bg-gray-400'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${desktopMode ? 'w-3.5 h-3.5' : 'w-6 h-6'} text-white`}>
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                        </div>
                      ) : (
                        <img src={r.icon} alt="" className={`${desktopMode ? 'w-full h-full' : 'w-8 h-8'} transition-opacity group-hover:opacity-100 ${isAffordable ? 'opacity-80' : 'opacity-40'}`} />
                      )}
                    </div>

                    {/* Reward Name Area (Selectable) */}
                    <div className="flex-grow pr-2">
                      <div className={`text-[12px] font-medium ${isAffordable ? 'text-[#323232]' : 'text-gray-400'}`}>{r.reward}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-1.5 mb-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">USE</span>
                        <img src={PointsRooLogo} className={`w-3.5 h-3.5 ${isAffordable ? '' : 'opacity-40'}`} />
                        <span className={`text-[12px] font-medium ${isAffordable ? 'text-[#323232]' : 'text-gray-400'}`}>{r.pts.toLocaleString()}</span>
                        <span className={`text-[10px] font-bold ${isAffordable ? 'text-[#999999]' : 'text-gray-400'}`}>PTS</span>
                      </div>
                    </div>

                    {/* Arrow Glyph Area (Exclusive Expand) */}
                    <div
                      className={`ml-3 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleExpand(r.id);
                      }}
                    >
                      <svg className={desktopMode ? "w-4 h-4" : "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-4 pb-6 pl-[72px]">
                      {/* Description */}
                      {r.desc && (
                        <p className={`text-[12px] leading-relaxed mb-3 whitespace-pre-line ${isAffordable ? 'text-[#323232]' : 'text-gray-400'}`}>
                          {r.desc}
                        </p>
                      )}

                      {/* Link */}
                      {r.linkText && (
                        <button className="text-[12px] text-red-600 font-medium hover:underline flex items-center mb-2">
                          {r.linkText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {allRewards.length === 0 && (
              <div className="text-center text-gray-500 py-10 px-6">
                No rewards available in this category.
              </div>
            )}
            {/* Bottom spacer for footer visibility */}
            <div className="h-[320px]"></div>
          </div>
        )}
      </div>

      {/* Footer Container - Hidden in desktopMode */}
      {!desktopMode && (
        <div className="shrink-0 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] rounded-t-[24px] relative z-[9000]">
          {/* Drag Handle (Visual only for now) */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-[40px] h-1.5 bg-gray-200 rounded-full" />
          </div>

          <div className="px-6 pb-6 pt-1">
            {/* Estimator Line */}
            <div className="text-center mb-4 flex justify-center items-center">
              {totalAnnualPts > 0 ? (
                <div className="flex items-baseline space-x-1 flex-wrap justify-center">
                  <span className="text-[15px] text-[#323232]">Est</span>
                  <img src={PointsRooLogo} alt="" className="w-[16px] h-[18px] translate-y-0.5" />
                  <span className="text-[16px] font-medium text-[#323232] leading-none">
                    {totalAnnualPts.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-[#999999] uppercase">PTS</span>
                  <span className="text-[15px] text-[#323232] ml-1">a year from selected</span>
                </div>
              ) : (
                <span className="text-[15px] text-[#323232]">No ways to earn selected.</span>
              )}
            </div>

            {/* Conditional Content: Show reward selection panel OR normal favourite reward content */}
            {showRewardModal && pendingRewardObj ? (
              /* Reward Selection Panel + Grey Button */
              <>
                <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm relative mb-4">
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="p-5">
                    <div className="flex items-start space-x-4">
                      {/* Duo Mascot */}
                      <img
                        src={DuoMascot}
                        alt=""
                        className="w-14 h-14 flex-shrink-0"
                      />

                      {/* Content */}
                      <div className="flex-grow pt-1">
                        <div className="text-[18px] text-[#323232] mb-1">
                          This reward is <span className="font-bold">{pendingRewardObj.pts.toLocaleString()}</span>
                          <span className="text-[12px] font-bold text-[#999999] ml-1">PTS</span>
                        </div>
                        <p className="text-[15px] text-[#666666] leading-relaxed">
                          I'll show you how you can earn the points, in one year.
                        </p>
                      </div>
                    </div>

                    {/* Show Me Button */}
                    <button
                      onClick={handleShowMe}
                      className="w-full mt-5 py-4 bg-[#E40000] font-medium tracking-[0.1em] text-white text-[16px] rounded-[8px] active:scale-[0.98] transition-all uppercase hover:bg-red-700"
                    >
                      SHOW ME
                    </button>
                  </div>
                </div>

                {/* Grey Favourite Reward Button */}
                <button
                  disabled
                  className="w-full py-4 bg-gray-400 font-medium tracking-[0.1em] text-white text-[16px] rounded-[8px] uppercase flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span>FAVOURITE REWARD</span>
                </button>
              </>
            ) : (
              /* Normal Favourite Reward Content */
              <>
                {/* Labels Row */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[14px] font-medium text-[#323232]">
                    {current.hasSelectedReward ? 'Favourite reward' : 'Example reward'}
                  </span>
                  <button
                    onClick={handleGoBack}
                    className="text-[14px] font-medium text-red-600 hover:underline"
                  >
                    Explore ways to earn
                  </button>
                </div>

                {/* Card Preview */}
                <div className="mb-5">
                  {renderSelectedRewardPreview()}
                </div>

                {/* Main CTA */}
                <button
                  onClick={handleConfirmFavourite} // Confirm selection and navigate
                  disabled={!isSelectedAffordable}
                  className={`w-full py-4 bg-[#E40000] font-medium tracking-[0.1em] text-white text-[16px] rounded-[8px] active:scale-[0.98] transition-all uppercase flex items-center justify-center space-x-2
                        ${!isSelectedAffordable ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'hover:bg-red-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span>FAVOURITE REWARD</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop Modal for Selection Guidance - REMOVED, now inline */}
    </div>
  );
}
