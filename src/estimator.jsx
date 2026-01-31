import React, { useState, useEffect, useRef } from 'react';

import {
  WTEs,
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList
} from './data';

import CategoryTabs from './components/CategoryTabs';
import WTEList from './components/WTEList';
import StickyFooter from './components/StickyFooter';
import HelpModal from './components/HelpModal';

const categories = [
  { key: 'everyday', label: 'Everyday Earners' },
  { key: 'big', label: 'Big Points Earners' },
  { key: 'shop', label: 'Shop and Earn' },
  { key: 'travel', label: 'Travel and Earn' }
];

const rewardTabs = ['Flights', 'Hotels', 'Activities', 'Marketplace', 'Gift Cards', 'Entertainment'];
const rewardsMap = {
  Flights: flightsList,
  Hotels: hotelsList,
  Activities: activitiesList,
  Marketplace: marketplaceList,
  'Gift Cards': giftCardsList,
  Entertainment: entertainmentList
};

export default function PointsEstimator() {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [tierIndexById, setTierIndexById] = useState(
    WTEs.reduce((acc, w) => ({ ...acc, [w.id]: 2 }), {})
  );
  const [activeRewardTab, setActiveRewardTab] = useState(rewardTabs[0]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const tabsRef = useRef(null);

  // auto-center active category tab
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-key="${activeCategory}"]`);
    if (!btn) return;
    const cw = container.offsetWidth;
    const center = btn.offsetLeft + btn.offsetWidth / 2;
    container.scrollTo({ left: center - cw / 2, behavior: 'smooth' });
  }, [activeCategory]);

  // First-time help logic
  useEffect(() => {
    const hasSeenHelp = localStorage.getItem('hasSeenWTEHelp');
    if (!hasSeenHelp) {
      setTimeout(() => setIsHelpOpen(true), 500);
      localStorage.setItem('hasSeenWTEHelp', 'true');
    }
  }, []);

  const getTier = w => w.tiers[tierIndexById[w.id]];
  const totalPts = selectedIds.reduce(
    (sum, id) => sum + getTier(WTEs.find(w => w.id === id)).pts,
    0
  );

  const availableRewards = (rewardsMap[activeRewardTab] || []).filter(
    r => r.pts <= totalPts
  );

  const toggleSelect = id =>
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  const toggleExpand = id =>
    setExpandedId(prev => (prev === id ? null : id));

  const handleTierChange = (id, idx) => {
    setTierIndexById(prev => ({ ...prev, [id]: idx }));
    if (!selectedIds.includes(id)) toggleSelect(id);
  };

  const handleAddToDashboard = () => {
    console.log('Add to dashboard:', selectedIds);
  };

  return (
    <div className="max-w-md mx-auto pb-[320px] relative">
      {/* Help Icon Button */}
      <button
        onClick={() => setIsHelpOpen(true)}
        className="absolute top-2 right-4 z-10 p-2 text-gray-400 hover:text-red-600 transition-colors"
        aria-label="Help"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Category Tabs */}
      <div className="pt-2">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={key => {
            setActiveCategory(key);
            setExpandedId(null);
          }}
        />
      </div>

      {/* WTE List */}
      <WTEList
        WTEs={WTEs}
        activeCategory={activeCategory}
        selectedIds={selectedIds}
        expandedId={expandedId}
        tierIndexById={tierIndexById}
        onToggleSelect={toggleSelect}
        onToggleExpand={toggleExpand}
        onTierChange={handleTierChange}
      />

      {/* Sticky Footer */}
      {selectedIds.length > 0 && (
        <StickyFooter
          totalPts={totalPts}
          rewardTabs={rewardTabs}
          activeRewardTab={activeRewardTab}
          availableRewards={availableRewards}
          onRewardTabChange={tab => setActiveRewardTab(tab)}
          onAddToDashboard={handleAddToDashboard}
        />
      )}
    </div>
  );
}

