// src/screens/RewardsScreen.jsx
import React, {
  useState,
  useMemo,
  useCallback
} from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
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

export default function RewardsScreen({ goTo }) {
  const { current, updateSelectedWTU, updateSelectedRewardId } = useSaveSlots();
  const rewardsMap = useRewardsMap();

  // Global state
  const totalAnnualPts = current?.totalAnnualPts ?? 0;
  const activeTabKey = current?.selectedWTU ?? rewardTabKeys[0];
  const globalSelectedRewardId = current?.selectedRewardId ?? null;

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

  // Affordable rewards for list view
  const affordableRewards = useMemo(
    () => (rewardsMap[activeTabKey] || []).filter(r => r.pts <= totalAnnualPts),
    [activeTabKey, totalAnnualPts, rewardsMap]
  );

  // Handlers
  const handleTabChange = useCallback(key => {
    updateSelectedWTU(key);

    if (key === 'Flights') {
      const first = flightsList.find(f => f.pts <= totalAnnualPts);
      const id = first?.id ?? null;
      updateSelectedRewardId(id);
    } else {
      const first = (rewardsMap[key] || []).find(r => r.pts <= totalAnnualPts);
      updateSelectedRewardId(first?.id ?? null);
    }
  }, [updateSelectedWTU, updateSelectedRewardId, rewardsMap, totalAnnualPts]);

  const handleSelectRewardOnMap = useCallback(id => {
    const next = globalSelectedRewardId === id ? null : id;
    updateSelectedRewardId(next, true);
  }, [globalSelectedRewardId, updateSelectedRewardId]);

  const handleSelectRewardInList = useCallback(id => {
    updateSelectedRewardId(id, true);
  }, [updateSelectedRewardId]);

  const handleGoBack = useCallback(() => goTo(3), [goTo]);

  const selectedRewardObj = useMemo(() => {
    const list = rewardsMap[activeTabKey] || [];
    return list.find(r => r.id === globalSelectedRewardId) || null;
  }, [rewardsMap, activeTabKey, globalSelectedRewardId]);

  const isSelectedAffordable = useMemo(() => {
    return selectedRewardObj ? selectedRewardObj.pts <= totalAnnualPts : false;
  }, [selectedRewardObj, totalAnnualPts]);

  if (!current) return <div className="p-6 text-center">Loading rewards...</div>;

  const renderMapSection = () => {
    if (activeTabKey !== 'Flights') return null;
    return (
      <div className="flex-grow relative border-t border-b border-gray-200">
        <LeafletMap
          flights={flightPoints}
          origin={ORIGIN_CITY.coords}
          selectedFlightId={globalSelectedRewardId}
          affordableIds={affordableFlightIds}
          onFlightClick={handleSelectRewardOnMap}
        />
      </div>
    );
  };

  const renderRewardCard = () => {
    const list = rewardsMap[activeTabKey] || [];
    const sel = list.find(r => r.id === globalSelectedRewardId);

    if (!sel) return (
      <div className="p-6 text-gray-400 text-center text-xs border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
        Choose a reward from the {activeTabKey === 'Flights' ? 'map' : 'list'} above.
      </div>
    );

    return <RewardCard reward={sel} />;
  };

  return (
    <div className="fixed inset-0 bg-white z-40 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 py-4 flex items-center shrink-0">
        <button onClick={handleGoBack} className="mr-4 text-gray-900 hover:text-red-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">
          What can I get with {totalAnnualPts.toLocaleString()} pts?
        </h1>
      </div>

      {/* Tabs - Centered with balanced padding */}
      <div className="shrink-0 py-3 border-b border-gray-100/50">
        <CategoryTabs
          categories={rewardTabsConfig}
          activeCategory={activeTabKey}
          onCategoryChange={handleTabChange}
        />
        {activeTabKey !== 'Flights' && (
          <p className="mt-1 px-4 text-[11px] text-gray-500 italic">
            Select a way of using Qantas Points to add to your dashboard.
          </p>
        )}
      </div>

      {/* Main Content (Map or List) */}
      <div className="flex-grow flex flex-col min-h-0 overflow-y-auto">
        {activeTabKey === 'Flights' ? (
          renderMapSection()
        ) : (
          <div className="p-4 space-y-3">
            {affordableRewards.map(r => (
              <button
                key={r.id}
                onClick={() => handleSelectRewardInList(r.id)}
                className={`w-full p-3 rounded border text-left ${globalSelectedRewardId === r.id
                  ? 'border-2 border-red-600 bg-red-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
              >
                <div className="flex justify-between items-end">
                  <div className="text-sm font-semibold flex-1 pr-2">{r.reward}</div>
                  <div className="flex items-baseline text-sm font-semibold">
                    <span className="text-[10px] mr-0.5">Use</span>
                    <img src={PointsRooLogo} className="w-3 h-3 mx-0.5" />
                    <span>{r.pts.toLocaleString()}</span>
                    <span className="text-[10px] ml-0.5">PTS</span>
                  </div>
                </div>
              </button>
            ))}
            {affordableRewards.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No rewards available in this category for your points estimate.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-6 pb-8 space-y-6 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
        {renderRewardCard()}

        <button
          onClick={handleGoBack}
          disabled={!isSelectedAffordable}
          className={`w-full py-4 font-black tracking-[0.1em] text-white text-base rounded-lg transition-all active:scale-[0.98]
            ${isSelectedAffordable
              ? 'bg-red-600 shadow-lg'
              : 'bg-gray-400 grayscale opacity-70 cursor-not-allowed'
            }`}
        >
          SELECT
        </button>
      </div>
    </div>
  );
}
