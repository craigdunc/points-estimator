import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import {
  WTEs,
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList,
  SC_VALUES,
} from '../data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConnectedRewardCard from '../components/ConnectedRewardCard';
import TierCard from '../components/TierCard';
import KoalaSprite from '../components/KoalaSprite';
import PointsRooLogo from '../assets/points-roo.svg';
import OnboardingStepper from '../components/OnboardingStepper';
import MonthWrapUpModal from '../components/MonthWrapUpModal';


const CairnsThumb = "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=400";
const MelbourneThumb = "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=600";
const HotelThumb = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400";
const ExperienceThumb = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=400";

export default function Dashboard({ goTo }) {
  const { slots, activeSlotId, current, advanceMonth, setDashboardIntroDismissed, updateFavouriteTierIndex } = useSaveSlots();
  const [showOnboardingId, setShowOnboardingId] = useState(null);
  const [showWrapup, setShowWrapup] = useState(false);
  const [lastMonthData, setLastMonthData] = useState(null);
  if (!activeSlotId || !current) return null;
  const slot = slots.find(s => s.id === activeSlotId);

  const {
    selectedWTEs = [],
    totalAnnualPts = 0,
    selectedWTU,
    selectedRewardId,
    favouriteTierIndex,
    dashboardIntroDismissed,
    tierIndexById,
  } = current;

  const hasFlights = selectedWTEs?.some((w) => String(w.id) === '22');
  const flightTierIndex = hasFlights ? (tierIndexById?.[22] ?? 2) : 0;

  const isIntroState = !dashboardIntroDismissed;

  const rewardsMap = {
    Flights: flightsList,
    Hotels: hotelsList,
    Activities: activitiesList,
    Marketplace: marketplaceList,
    'Gift Cards': giftCardsList,
    Entertainment: entertainmentList,
  };

  const selectedReward = (rewardsMap[selectedWTU] || []).find(r => r.id === selectedRewardId) || null;
  /* --- Time Passes Link --- */
  const handleTimePasses = () => {
    // Capture data for the wrap-up modal before advancing
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [, m] = (current.currentMonth || '2025-02').split('-').map(Number);

    const data = {
      monthName: monthNames[m - 1],
      totalEarned: Object.values(current.monthlyEarnedByWTE || {}).reduce((a, b) => a + b, 0),
      totalTarget: Math.round(totalAnnualPts / 12),
      earnedById: current.monthlyEarnedByWTE || {},
      targetsById: current.monthlyTargetByWTE || {},
    };

    setLastMonthData(data);
    advanceMonth();
    setShowWrapup(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] font-sans text-[#323232]">
      <Header
        isMobile={false}
        onProfileClick={() => goTo(0)}
        activeTab="For you"
        onTabClick={(tab) => {
          if (tab === 'Earn and use points') goTo(3);
        }}
      />

      <div className="w-full bg-white rounded-b-[48px] shadow-sm mb-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8 pt-8 pb-12">

          {/* --- Top Global Header (Inside White Box) --- */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-[28px] font-medium text-[#323232] leading-tight mb-1" style={{ fontFamily: 'Qantas Sans, sans-serif' }}>
                Good morning, {slot?.name || 'William'}
              </h1>
              {isIntroState && <p className="text-[14px] text-gray-500 font-bold">Let's get started</p>}
            </div>

            {!isIntroState && (
              <div className="flex bg-[#E1F2F2] rounded-full px-4 py-1.5 border border-[#C5EDED]">
                <span className="text-[13px] font-bold text-[#007A7A]">February Target: {Math.round(totalAnnualPts / 12).toLocaleString()} PTS</span>
              </div>
            )}

            <div className="text-right flex items-center gap-4">
              <button
                onClick={handleTimePasses}
                className="text-[#E40000] text-[13px] font-bold hover:underline bg-[#FFEAEA] px-3 py-1.5 rounded-full mr-2 hidden md:block"
              >
                Time passes
              </button>
              <div className="text-right">
                <p className="text-[15px] font-bold leading-none">Bronze</p>
                <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-medium">Frequent Flyer 1234 567 890</p>
              </div>
              <div className="w-[48px] h-[48px] bg-[#E40000] rounded-full flex items-center justify-center shadow-md">
                <img src={PointsRooLogo} alt="" className="w-6 h-6 brightness-0 invert" />
              </div>
            </div>
          </div>

          {/* --- Top Panel Content --- */}
          <div>
            {isIntroState ? (
              <div className="flex flex-col xl:flex-row gap-8 items-center justify-between">
                {/* Left: Koala Sprite */}
                <div className="flex-shrink-0 flex items-center justify-center transform scale-90">
                  <KoalaSprite />
                </div>

                {/* Middle: Intro Content */}
                <div className="flex-grow max-w-[400px]">
                  <h2 className="text-[24px] font-medium text-[#323232] mb-3">Let's get you some points</h2>
                  <p className="text-[14px] text-gray-800 leading-relaxed mb-8">
                    One of the best ways to get the most out of your membership is by finding a few different ways of earning points. You can add points to your account homepage.
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    <button
                      onClick={() => {
                        setDashboardIntroDismissed(true);
                        goTo(3);
                      }}
                      className="bg-[#E40000] text-white px-8 py-3 rounded-[6px] font-bold text-[13px] uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
                    >
                      SHOW ME
                    </button>
                    <button
                      onClick={() => goTo(4)}
                      className="text-[#E40000] text-[13px] font-bold hover:underline"
                    >
                      Choose favorite reward
                    </button>
                  </div>
                  <button
                    onClick={() => setDashboardIntroDismissed(true)}
                    className="text-[12px] text-[#E40000] font-bold hover:underline"
                  >
                    Skip
                  </button>
                </div>

                {/* Right: Illustration */}
                <div className="flex-shrink-0 flex justify-end">
                  <div className="flex items-end gap-6">
                    {/* Step 1: Choose */}
                    <div className="flex flex-col items-center">
                      <div className="w-[120px] h-[120px] bg-[#F7F7F7] rounded-[16px] border border-gray-100 flex items-center justify-center relative shadow-sm mb-3">
                        <div className="w-16 h-10 bg-white rounded-[4px] border border-gray-100 flex items-center justify-center p-2">
                          <div className="w-full h-1 bg-[#E1F2F2] rounded-full" />
                        </div>
                        <div className="absolute top-2 right-2 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-[14px] font-medium text-[#323232]">Choose</span>
                    </div>

                    {/* Step 2: Add */}
                    <div className="flex flex-col items-center">
                      <div className="w-[120px] h-[120px] bg-[#F7F7F7] rounded-[16px] border border-gray-100 p-4 flex flex-col justify-center gap-2 relative shadow-sm mb-3">
                        {[1, 2].map(i => (
                          <div key={i} className="bg-white rounded-[4px] border border-gray-100 p-2 flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border border-[#E40000] flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div className="h-1.5 w-12 bg-gray-100 rounded-full" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[14px] font-medium text-[#323232]">Add</span>
                    </div>

                    {/* Step 3: Set up */}
                    <div className="flex flex-col items-center">
                      <div className="w-[120px] h-[120px] bg-[#F7F7F7] rounded-[16px] border border-gray-100 flex items-center justify-center relative shadow-sm mb-3">
                        <div className="w-[84px] h-[84px] rounded-full border-4 border-dashed border-[#C5EDED] bg-white flex items-center justify-center" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                          <span className="text-[#007A7A] font-bold text-[14px]">+ 50</span>
                          <span className="text-[#007A7A] font-bold text-[10px] uppercase">PTS</span>
                        </div>
                      </div>
                      <span className="text-[14px] font-medium text-[#323232]">Set up</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Progress */}
                <div className="lg:col-span-8">

                  <div className="flex items-center space-x-6 mb-8">
                    <span className="text-[16px] font-medium">February</span>
                    <div className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[#323232] text-[13px] font-bold shadow-sm">
                      Target {Math.round(totalAnnualPts / 12).toLocaleString()} PTS
                    </div>
                  </div>

                  {/* Favourite ways to earn */}
                  <div className="lg:col-span-12 mt-4 pt-10 border-t border-gray-100">
                    <h3 className="text-[20px] font-bold mb-8">Favourite ways to earn:</h3>
                    <div className="flex flex-wrap gap-8">
                      {selectedWTEs.map(({ id: stringId }) => {
                        const numericId = Number(stringId);
                        const wte = WTEs.find(w => w.id === numericId);
                        if (!wte) return null;

                        const earned = (current.monthlyEarnedByWTE || {})[numericId] || 0;
                        const target = (current.monthlyTargetByWTE || {})[numericId] || 1;
                        const setupSteps = (current.setupProgressByWTE || {})[numericId] || 0;

                        const percent = earned > 0
                          ? Math.min(100, Math.round((earned / target) * 100))
                          : (setupSteps / 4) * 100;

                        return (
                          <div key={numericId} className="flex flex-col items-center w-[120px]">
                            <span className="text-[12px] font-medium text-center mb-3 h-[32px] flex items-center line-clamp-2">
                              {wte.name}
                            </span>
                            <div className="relative w-[84px] h-[84px] mb-4">
                              {/* Progress Circle */}
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="42" cy="42" r="38" fill="none" stroke="#F3F5F7" strokeWidth="4" />
                                <circle
                                  cx="42" cy="42" r="38" fill="none"
                                  stroke={earned > 0 ? "#E40000" : "#BCBCBC"}
                                  strokeWidth="4"
                                  strokeDasharray={238.7}
                                  strokeDashoffset={238.7 - (238.7 * percent) / 100}
                                  strokeLinecap="round"
                                  className="transition-all duration-1000"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[64px] h-[64px] bg-white rounded-full p-2 flex items-center justify-center shadow-sm">
                                  <img src={wte.iconSrc} alt={wte.name} className="w-full h-full object-contain" />
                                </div>
                              </div>
                            </div>
                            {earned > 0 ? (
                              <div className="text-center">
                                <p className="text-[16px] font-bold">+{earned.toLocaleString()}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">PTS</p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <button
                                  onClick={() => setShowOnboardingId(stringId)}
                                  className="bg-white border border-gray-300 rounded-full px-4 py-1 text-[11px] font-bold hover:border-red-600 hover:text-red-600 transition-colors"
                                >
                                  Set up
                                </button>
                                <span className="text-[10px] text-[#E40000] font-bold mt-1">+50 PTS</span>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Add New Slot */}
                      <div className="flex flex-col items-center w-[120px]">
                        <span className="text-[12px] font-medium mb-3 h-[32px] flex items-center">Add new</span>
                        <button
                          onClick={() => goTo(3)}
                          className="w-[84px] h-[84px] rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-[32px] text-gray-300 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all mb-4"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Target Reward & Profile */}
                <div className="lg:col-span-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#666] uppercase tracking-wider">Target Annual Earn: {totalAnnualPts.toLocaleString()} PTS</span>
                    </div>
                    <button
                      onClick={() => goTo(3)}
                      className="text-[11px] font-bold text-[#E40000] hover:underline"
                    >
                      Edit
                    </button>
                  </div>

                  <p className="text-[11px] font-bold text-[#666] uppercase tracking-wider mb-4">Target reward:</p>

                  <div className="w-full mb-8">
                    {selectedReward ? (
                      <ConnectedRewardCard reward={selectedReward} />
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[24px] aspect-[1.4/1] flex items-center justify-center">
                        <button onClick={() => goTo(4)} className="text-[#E40000] font-bold hover:underline">Select a target reward</button>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] font-bold text-[#666] uppercase tracking-wider mb-4 flex justify-between items-center">
                    <span>Target tier:</span>
                    <button
                      onClick={() => goTo(3)}
                      className="text-[11px] font-bold text-[#E40000] hover:underline normal-case"
                    >
                      Edit
                    </button>
                  </p>

                  <div className="w-full">
                    <TierCard
                      tierIndex={favouriteTierIndex !== null ? favouriteTierIndex : flightTierIndex}
                      isFavourite={favouriteTierIndex !== null}
                      onToggleFavourite={() => {
                        if (favouriteTierIndex !== null) {
                          updateFavouriteTierIndex(null);
                        } else {
                          updateFavouriteTierIndex(flightTierIndex);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8 py-4 mb-20 flex-grow w-full">
        {/* --- Lower Content (Sitting on Grey) --- */}
        <div className="space-y-12">

          <div>
            <div className="bg-white rounded-[16px] shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#666] uppercase tracking-wider mb-2">Depart location</label>
                  <div className="bg-[#F7F7F7] px-4 py-3.5 rounded-[8px] flex items-center space-x-3 border border-gray-100 cursor-text">
                    <svg className="w-5 h-5 text-[#323232]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="text-[14px] text-[#323232] font-medium">SYD, Sydney, Australia</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#666] uppercase tracking-wider mb-2">Arrival location</label>
                  <div className="bg-[#F7F7F7] px-4 py-3.5 rounded-[8px] flex items-center space-x-3 border border-gray-100 cursor-text">
                    <svg className="w-5 h-5 text-[#323232]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="text-[14px] text-[#323232] font-medium">LHR, London (Heathrow), United...</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#666] uppercase tracking-wider mb-2">Travel dates</label>
                  <div className="bg-[#F7F7F7] px-4 py-3.5 rounded-[8px] flex items-center space-x-3 border border-gray-100 cursor-pointer">
                    <svg className="w-5 h-5 text-[#323232]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-[14px] text-[#323232] font-medium">17 Dec 2025</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-6 text-[14px] text-[#323232] mb-4 md:mb-0">
                  <div className="flex items-center cursor-pointer">
                    <span className="font-medium mr-1">One way</span>
                    <svg className="w-4 h-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <svg className="w-4 h-4 text-[#666] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="font-medium mr-1">1 Adult</span>
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <span className="font-medium mr-1">Economy</span>
                    <svg className="w-4 h-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>

                  <div className="hidden md:flex items-center space-x-2 border-l border-gray-200 pl-6 cursor-pointer">
                    <svg className="w-5 h-5 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    <span className="font-medium">Rewards</span>
                    {/* Toggle Switch */}
                    <div className="w-10 h-6 bg-gray-300 rounded-full ml-2 relative transition-colors"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm" /></div>
                  </div>
                </div>

                <button className="bg-black hover:bg-gray-800 text-white font-bold py-3.5 px-8 rounded-full text-[14px] flex items-center justify-center space-x-2 transition-colors w-full md:w-auto">
                  <span>Search Flights</span>
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>

            {/* Links below search */}
            <div className="flex items-center space-x-8 mt-5 pl-2">
              <button className="flex items-center space-x-2 text-[13px] font-bold text-[#323232] hover:text-[#E40000] transition-colors">
                <svg className="w-4 h-4 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                <span>Multi-city</span>
              </button>
              <button className="flex items-center space-x-2 text-[13px] font-bold text-[#323232] hover:text-[#E40000] transition-colors">
                <svg className="w-4 h-4 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Where Can I Go?</span>
              </button>
              <button className="flex items-center space-x-2 text-[13px] font-bold text-[#323232] hover:text-[#E40000] transition-colors">
                <svg className="w-4 h-4 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Flight Credit</span>
              </button>
            </div>
          </div>

          {/* --- Section 3: Modular Components (Static) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">

            {/* Points detail mockup */}
            <div className="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Spend/Earn</p>
                  <p className="text-[11px] font-bold text-[#E40000] flex items-center cursor-pointer hover:underline">
                    Tier benefits <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg>
                  </p>
                </div>
                <div className="flex justify-between items-end mb-6">
                  <div className="text-[24px] font-medium leading-none">140,000</div>
                  <div className="text-[24px] font-medium leading-none">0</div>
                </div>

                <p className="text-[12px] font-bold text-[#323232] mb-3">Earn points by</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-gray-500">Qantas Points Club</span>
                    <span className="font-bold text-[#00994C]">+ 500</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-gray-500">Status Credits</span>
                    <span className="font-bold text-[#00994C]">+ 840</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-gray-500">Bonus earn</span>
                    <span className="font-bold text-gray-500">0</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2.5 mb-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-[11px] font-bold text-[#323232]">Memberships and Tier bonuses</span>
                  <div className="w-5 h-5 bg-[#E40000] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 mt-2 flex justify-between items-center cursor-pointer hover:text-[#E40000]">
                <span className="text-[13px] font-bold">Bookings</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>

            {/* Nova Component placeholders */}
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm flex flex-col justify-between">
                <p className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mt-1">[ NOVA COMPONENT ]</p>

                <div className="flex-grow flex items-center justify-center">
                  <p className="text-[20px] text-gray-300 font-light">TBC</p>
                </div>

                <div className="pt-3 border-t border-gray-50 mt-2 flex justify-between items-center">
                  <span className="text-[13px] font-bold text-[#323232]">TBC</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>

          {/* --- Section 4: Bookings & Upsell (Static) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[18px]">Your next booking is in 4 weeks</h3>
                <button className="text-[12px] font-bold text-[#E40000] flex items-center">MY TRIPS <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg></button>
              </div>
              <div className="relative rounded-[20px] overflow-hidden aspect-[1.8/1]">
                <img src={MelbourneThumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center space-x-2 text-white/90 text-[11px] font-bold uppercase tracking-widest mb-1">
                    <span className="w-2 h-2 bg-[#E40000] rounded-full" />
                    <span>UPCOMING FLIGHT</span>
                  </div>
                  <h4 className="text-white text-[24px] font-light italic">Melbourne</h4>
                  <p className="text-white/60 text-[12px]">SYD → MEL • Fri, 15 Mar 2026</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[18px] mb-4">Complete your trip</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-[16px] p-4 flex flex-col items-start space-y-3 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-[#E1F1FF] rounded-lg flex items-center justify-center text-[#0066CC]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
                  <div>
                    <p className="text-[14px] font-bold">Book with Qantas Hotels</p>
                    <p className="text-[11px] text-gray-500">Earn 3 points per $1 spent</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-[16px] p-4 flex flex-col items-start space-y-3 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-[#E1FFEF] rounded-lg flex items-center justify-center text-[#00994C]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                  <div>
                    <p className="text-[14px] font-bold">Earn with Bank & Cards</p>
                    <p className="text-[11px] text-gray-500">100,000+ bonus pts offers</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-[16px] p-4 flex flex-col items-start space-y-3 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-[#E1F1FF] rounded-lg flex items-center justify-center text-[#0066CC]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a1 1 0 102 0m-2 0a2 2 0 114 0" /></svg></div>
                  <div>
                    <p className="text-[14px] font-bold">Rent a Car</p>
                    <p className="text-[11px] text-gray-500">AVIS, Hertz & more</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-[16px] p-4 flex flex-col items-start space-y-3 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-[#FFE1E1] rounded-lg flex items-center justify-center text-[#E40000]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2C9.043 2 6.346 3.125 4.382 4.984a12.115 12.115 0 00-1.782 12.016A11.955 11.955 0 0112 22a11.955 11.955 0 018.845-8.238 12.115 12.115 0 00-1.782-12.016l.555.232z" /></svg></div>
                  <div>
                    <p className="text-[14px] font-bold">Travel Insurance</p>
                    <p className="text-[11px] text-gray-500">Protect your journey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Section 5: Offers (Static) --- */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[22px]">My Offers</h3>
              <button className="text-[12px] font-bold text-[#666] flex items-center">EXPLORE ALL <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer">
                <div className="aspect-[2/1] overflow-hidden relative">
                  <img src={ExperienceThumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-[#E40000] text-white text-[10px] font-bold px-2 py-1 rounded">OPEN FOR YOU</div>
                </div>
                <div className="p-6">
                  <h4 className="text-[18px] font-bold mb-2">Earn 20,000 pts with Travel Insurance</h4>
                  <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">Secure your next international trip and earn big on your premium.</p>
                  <button className="text-[12px] font-bold group-hover:text-[#E40000] transition-colors flex items-center">LEARN MORE <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg></button>
                </div>
              </div>
              <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer">
                <div className="aspect-[2/1] overflow-hidden relative">
                  <img src={HotelThumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-[#007A7A] text-white text-[10px] font-bold px-2 py-1 rounded">HOTEL EXCLUSIVE</div>
                </div>
                <div className="p-6">
                  <h4 className="text-[18px] font-bold mb-2">Double points on luxury stays</h4>
                  <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">Book a Luxury collection stay before March 31st for 2x points.</p>
                  <button className="text-[12px] font-bold group-hover:text-[#E40000] transition-colors flex items-center">VIEW HOTELS <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      {showOnboardingId && (
        <OnboardingStepper
          wteId={showOnboardingId}
          onDone={() => setShowOnboardingId(null)}
        />
      )}

      {showWrapup && lastMonthData && (
        <MonthWrapUpModal
          data={lastMonthData}
          onClose={() => setShowWrapup(false)}
        />
      )}
    </div>
  );
}


