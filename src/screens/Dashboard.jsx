import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import wteSubItems from '../wteSubItems.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConnectedRewardCard from '../components/ConnectedRewardCard';
import TierCard from '../components/TierCard';
import KoalaSprite from '../components/KoalaSprite';
import PointsRooLogo from '../assets/points-roo.svg';
import OnboardingStepper from '../components/OnboardingStepper';
import MonthWrapUpModal from '../components/MonthWrapUpModal';
import ArrowUpImage from '../assets/images/arrow-up.svg';

import imgRede from '../assets/images/rede.jpg';
import imgCarpetCourt from '../assets/images/carpetcourt.jpg';
import imgSingapore from '../assets/images/singapore.jpg';
import imgQtGoldcoast from '../assets/images/qt-goldcoast.jpg';
import imgFlightMelbourne from '../assets/images/flight-melbourne.jpg';
import logoRede from '../assets/logos/rede.png';
import logoCarpetCourt from '../assets/logos/carpetcourt.png';
import logoEDR from '../assets/logos/EDR.svg';
import imgChoose from '../assets/images/choose.png';
import imgAdd from '../assets/images/add.png';
import imgSetup from '../assets/images/setup.png';
import logoUpgrade from '../assets/logos/upgrade.svg';
import logoPoints from '../assets/logos/points.svg';
import logoQantasTail from '../assets/logos/qantas-tail.svg';
import iconClassicReward from '../assets/icons/classic reward.svg';
import iconLounge from '../assets/icons/lounge.svg';
import iconBoardingPass from '../assets/icons/boarding pass.svg';

import iconHotelBed from '../assets/icons/hotel-bed.svg';
import iconHoliday from '../assets/icons/holiday.svg';
import iconPlaneProtection from '../assets/icons/plane protection.svg';
import iconCreditCards from '../assets/icons/credit cards.svg';
import iconGift from '../assets/icons/gift.svg';
import iconHouseWithDollar from '../assets/icons/runway_icon_detailed_house_with_dollar.svg';
import iconCar from '../assets/icons/car.svg';

import iconArrowRight from '../assets/icons/arrow-right.svg';
import iconCalendar from '../assets/icons/calendar.svg';
import iconWheelsDown from '../assets/icons/wheels-down.svg';
import iconWheelsUp from '../assets/icons/wheels-up.svg';
import iconAdult from '../assets/icons/adult.svg';
import iconFlightCredit from '../assets/icons/Flight-credit.svg';
import iconMap from '../assets/icons/Map.svg';
import iconMultiCity from '../assets/icons/multi-city.svg';
import iconAward from '../assets/icons/award.svg';

const exploreItems = [
  { name: 'Hotels', icon: iconHotelBed },
  { name: 'Holidays', icon: iconHoliday },
  { name: 'Travel Insurance', icon: iconPlaneProtection },
  { name: 'Credit Cards', icon: iconCreditCards },
  { name: 'Marketplace', icon: iconGift },
  { name: 'Home Loans', icon: iconHouseWithDollar },
  { name: 'Car Hire', icon: iconCar },
  { name: 'All products', isAll: true }
];

const CairnsThumb = "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=400";
const MelbourneThumb = "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=600";
const HotelThumb = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400";
const ExperienceThumb = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=400";

import HTMLTypewriter from '../components/HTMLTypewriter';
import HelpMeModal from '../components/HelpMeModal';

const playSparkleSound = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'shoot') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      let t = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.8);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);

      osc.start(t);
      osc.stop(t + 0.8);
    } else if (type === 'scatter') {
      const freqs = [1200, 1600, 2400, 3200];
      let t = ctx.currentTime;
      freqs.forEach((freq, i) => {
        let osc = ctx.createOscillator();
        let gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.05);
        gain.gain.setValueAtTime(0, t + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.05, t + i * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + i * 0.05);
        osc.stop(t + i * 0.05 + 0.3);
      });
    }
  } catch { /* ignore */ }
};

/* Confetti burst — colorful pieces that fly outward from circle center */
const ConfettiBurst = React.memo(() => {
  const pieces = useMemo(() => {
    const colors = ['#D7F1F0', '#E40000', '#C3A56E', '#BFF4F2', '#D7F1F0', '#E40000'];
    return [...Array(12)].map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const dist = 46 + Math.random() * 22;
      const size = 3 + Math.random() * 3;
      return { angle, dist, size, color: colors[i % colors.length], delay: i * 25 };
    });
  }, []);

  return pieces.map((p, i) => (
    <div
      key={i}
      className="absolute left-1/2 top-1/2 rounded-full z-20 pointer-events-none"
      style={{
        width: p.size,
        height: p.size,
        backgroundColor: p.color,
        animation: `confetti-burst 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}ms forwards`,
        '--cx': `${Math.cos(p.angle) * p.dist}px`,
        '--cy': `${Math.sin(p.angle) * p.dist}px`,
      }}
    />
  ));
});

/* Points count-up — renders inline text to be placed inside the circle */
const PointsDropAnimation = ({ addedPts }) => {
  const [displayPts, setDisplayPts] = useState(0);

  useEffect(() => {
    playSparkleSound('scatter');
    let startTime = null;
    let animId;
    const duration = 1200;
    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayPts(Math.floor(addedPts * ease));
      if (progress < 1) animId = requestAnimationFrame(step);
    };
    setTimeout(() => { animId = requestAnimationFrame(step); }, 50);
    return () => cancelAnimationFrame(animId);
  }, [addedPts]);

  return (
    <span className="text-[15px] font-bold text-[#E40000] leading-none animate-celebrate-pop drop-shadow-[0_1px_2px_rgba(228,0,0,0.25)]">
      +{displayPts.toLocaleString()}
    </span>
  );
};

export default function Dashboard({ goTo }) {
  const { slots, activeSlotId, current, advanceTime, setDashboardIntroDismissed, updateFavouriteTierIndex, saveState } = useSaveSlots();
  const [showOnboardingId, setShowOnboardingId] = useState(null);
  const [showWrapup, setShowWrapup] = useState(false);
  const [lastMonthData, setLastMonthData] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const wteScrollRef = useRef(null);

  const [showMonthlyTargetModal, setShowMonthlyTargetModal] = useState(false);
  const [helpMeWteId, setHelpMeWteId] = useState(null);
  const [helpPhase, setHelpPhase] = useState(0);

  const [displayEarnedByWTE, setDisplayEarnedByWTE] = useState(current?.monthlyEarnedByWTE || {});
  const [animationQueue, setAnimationQueue] = useState([]);
  const [activeAnim, setActiveAnim] = useState(null);
  const prevEarnedRef = useRef(current?.monthlyEarnedByWTE || {});

  useEffect(() => {
    const curr = current?.monthlyEarnedByWTE || {};
    const selectedIds = (current?.selectedWTEs || []).map(w => String(w.id));
    const newItems = [];
    // Iterate in selectedWTEs order (left-to-right on desktop)
    selectedIds.forEach(strId => {
      const o = prevEarnedRef.current[strId] || 0;
      const c = curr[strId] || 0;
      if (c > o) {
        newItems.push({ wteId: strId, addedPts: c - o, finalPts: c });
      }
    });

    if (newItems.length > 0) {
      setAnimationQueue(prev => [...prev, ...newItems]);
    } else {
      setDisplayEarnedByWTE(curr);
    }
    prevEarnedRef.current = curr;
  }, [current?.monthlyEarnedByWTE]);

  useEffect(() => {
    if (!activeAnim && animationQueue.length > 0) {
      const nextAnim = animationQueue[0];
      setAnimationQueue(q => q.slice(1));
      setActiveAnim(nextAnim);

      // Delay the earned value update so the ring animates visibly
      setTimeout(() => {
        setDisplayEarnedByWTE(prev => ({ ...prev, [nextAnim.wteId]: nextAnim.finalPts }));
      }, 400);

      // Clear activeAnim after animation completes to process next in queue
      setTimeout(() => {
        setActiveAnim(null);
      }, 2500);
    }
  }, [activeAnim, animationQueue]);

  const [introPhase, setIntroPhase] = useState(0);
  const [shootSparks, setShootSparks] = useState(null);
  const [scatterSparks, setScatterSparks] = useState(null);
  const [headlineDone, setHeadlineDone] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);

  const isIntroState = !current?.dashboardIntroDismissed;

  const hasResetPoints = useRef(false);
  useEffect(() => {
    if (isIntroState && introPhase === 0 && !hasResetPoints.current) {
      saveState({ currentPtsBalance: 0 });
      hasResetPoints.current = true;
    }
  }, [isIntroState, introPhase, saveState]);

  const handleAcceptWelcome = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const headerBtn = document.getElementById('header-points-pill');
    let targetX = window.innerWidth - 100;
    let targetY = 20;

    if (headerBtn) {
      const hRect = headerBtn.getBoundingClientRect();
      targetX = hRect.left + 24;
      targetY = hRect.top + hRect.height / 2;
    }

    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const tx = targetX - startX;
    const ty = targetY - startY;

    setShootSparks({ startX, startY, tx, ty });
    playSparkleSound('shoot');

    setTimeout(() => {
      setShootSparks(null);
      setScatterSparks({ x: targetX, y: targetY });
      playSparkleSound('scatter');
      saveState({ currentPtsBalance: 100 });
    }, 1000);

    setTimeout(() => {
      setScatterSparks(null);
      setIntroPhase(1);
      setHeadlineDone(false);
      setTypewriterDone(false);
    }, 1600);
  }

  useEffect(() => {
    const checkScroll = () => {
      if (wteScrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = wteScrollRef.current;
        setCanScrollLeft(scrollLeft > 0);

        // Add a tiny tolerance to prevent floating point/padding rounding errors from falsely triggering the chevron
        setCanScrollRight(scrollWidth > clientWidth + 2 && scrollLeft + clientWidth < scrollWidth - 2);
      }
    };

    // Check after a brief delay to ensure layout has settled
    setTimeout(checkScroll, 50);
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [current?.selectedWTEs]);

  if (!activeSlotId || !current) return null;
  const slot = slots.find(s => s.id === activeSlotId);

  const {
    selectedWTEs = [],
    selectedWTU,
    selectedRewardId,
    favouriteTierIndex,
    tierIndexById,
  } = current;

  const hasFlights = selectedWTEs?.some((w) => String(w.id) === '22');
  const flightTierIndex = hasFlights ? (tierIndexById?.[22] ?? 2) : 0;



  const rewardsMap = {
    Flights: flightsList,
    Hotels: hotelsList,
    Activities: activitiesList,
    Marketplace: marketplaceList,
    'Gift Cards': giftCardsList,
    Entertainment: entertainmentList,
  };

  const selectedReward = (rewardsMap[selectedWTU] || []).find(r => r.id === selectedRewardId) || null;

  const TIER_LABELS = [
    'Low earn target',
    'Medium-low earn target',
    'Medium earn target',
    'Medium-high earn target',
    'High earn target',
  ];

  /* --- Time Passes Link --- */
  const handleTimePasses = () => {
    const currentWeek = current.currentWeek || 1;

    if (currentWeek < 4) {
      // Just advance the week and add points
      advanceTime();
    } else {
      // It's the end of week 4, the month is finishing.
      // Capture data for the wrap-up modal before advancing
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const [, m] = (current.currentMonth || '2025-02').split('-').map(Number);

      const data = {
        monthName: monthNames[m - 1],
        totalEarned: Object.values(current.monthlyEarnedByWTE || {}).reduce((a, b) => a + b, 0),
        totalTarget: Object.values(current.monthlyTargetByWTE || {}).reduce((a, b) => a + b, 0),
        earnedById: current.monthlyEarnedByWTE || {},
        targetsById: current.monthlyTargetByWTE || {},
      };

      setLastMonthData(data);
      advanceTime(); // This triggers the month change
      setShowWrapup(true);
    }
  };

  // Format month for display
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [, dashboardMonth] = (current?.currentMonth || '2025-02').split('-').map(Number);
  const displayMonthName = monthNames[dashboardMonth - 1] || 'February';

  const MonthlyTargetModal = () => {
    const modalRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowMonthlyTargetModal(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const totalTarget = Object.values(current.monthlyTargetByWTE || {}).reduce((a, b) => a + b, 0);

    return (
      <div className="absolute top-0 z-[100]">
        <div
          ref={modalRef}
          className="w-[320px] bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="relative px-6 py-4 border-b border-gray-50 flex items-center justify-center">
            <div className="flex items-baseline bg-[#D7F1F0] rounded-full px-[14px] py-[4px]">
              <span className="text-[15px] text-[#323232] mr-1.5 font-normal">{displayMonthName} Target:</span>
              <span className="text-[15px] font-bold text-[#323232] tracking-tight">{totalTarget.toLocaleString()}</span>
              <span className="text-[11px] font-medium text-[#323232] ml-1 uppercase">PTS</span>
            </div>

            <button
              onClick={() => setShowMonthlyTargetModal(false)}
              className="absolute right-5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* List */}
          <div className="p-2">
            {totalTarget === 0 ? (
              <div className="px-6 py-6 pb-2 text-center text-[#555] text-[14px]">
                <p className="mb-6 leading-relaxed">You can set a target by choosing some ways to earn points, and setting a target amount of points for each one.</p>
                <button
                  onClick={() => goTo(3)}
                  className="bg-white text-[15px] font-semibold text-[#E40000] px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap"
                >
                  Show me
                </button>
              </div>
            ) : (
              selectedWTEs.map(({ id: stringId }) => {
                const numericId = Number(stringId);
                const wte = WTEs.find(w => w.id === numericId);
                if (!wte) return null;

                const target = (current.monthlyTargetByWTE || {})[numericId] || 0;
                const tierIdx = tierIndexById?.[numericId] ?? 2;
                const tierLabel = TIER_LABELS[tierIdx];

                return (
                  <div key={numericId} className={`px-4 flex flex-col border-b border-gray-100 last:border-0 group py-3`}>
                    {/* Top Line: Name and Points */}
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-[14px] font-medium text-[#323232] truncate pr-4">{wte.name}</h4>
                      <div className="flex items-baseline shrink-0">
                        <img
                          alt=""
                          className="w-[16px] h-[18px] translate-y-[3px] inline-block mr-1.5"
                          src="data:image/svg+xml,%3csvg%20width='27'%20height='24'%20viewBox='0%200%2027%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.0576%2023.6163C26.0794%2023.639%2026.1012%2023.639%2026.1232%2023.639C26.167%2023.639%2026.1891%2023.639%2026.2329%2023.5933C26.2764%2023.5476%2026.2764%2023.4564%2026.2329%2023.4107C23.6278%2020.5556%2020.4319%2018.249%2016.8637%2016.7647C15.7692%2016.3078%2015.7692%2016.3078%2015.7692%2016.3078C15.1999%2016.0563%2014.8279%2015.4856%2014.8279%2014.8232C14.8935%2012.3795%2020.4099%2012.882%2020.9791%2011.7171C21.0668%2011.5116%2021.0668%2011.5116%2021.0668%2011.5116C19.9284%2010.4838%2018.5929%209.73024%2017.1046%209.2964C17.0828%209.36483%2017.0387%209.63882%2017.3451%2010.1641C17.6738%2010.7123%2016.9949%2011.603%2015.988%2010.6439C15.9004%2010.5752%2015.9004%2010.5752%2015.9004%2010.5752C8.58908%203.58648%205.21819%208.19991%200.2491%200.0695199C0.20529%200.000828303%200.139698%20-0.0218967%200.0738597%200.0238116C0.00826853%200.0695199%20-0.0137602%200.137953%200.00826853%200.206386C3.92666%2010.0499%2011.9384%207.97163%2012.8797%2017.1528C12.9235%2017.4955%2013.1644%2017.7695%2013.4926%2017.8152C17.9362%2018.546%2022.2707%2020.4645%2026.0358%2023.6163H26.0576'%20fill='%23E40000'/%3e%3c/svg%3e"
                        />
                        <span className="text-[14px] font-medium text-[#323232]">{target.toLocaleString()}</span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase ml-1">PTS</span>
                      </div>
                    </div>
                    {/* Bottom Line: Label and Edit */}
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] text-gray-900 font-normal">{tierLabel}</p>
                      <button
                        onClick={() => goTo(3, { initialExpandId: stringId })}
                        className="text-[12px] text-[#E40000] font-medium underline shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Separator */}
          <div className="h-[1px] bg-[#666666] mx-0"></div>

          {/* Footer Total */}
          <div className="px-6 py-5 bg-white flex items-center justify-between">
            <span className="text-[14px] font-medium text-[#323232]">Total</span>
            <div className="flex items-baseline">
              <img
                alt=""
                className="w-[16px] h-[18px] translate-y-[3px] inline-block mr-1.5"
                src="data:image/svg+xml,%3csvg%20width='27'%20height='24'%20viewBox='0%200%2027%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.0576%2023.6163C26.0794%2023.639%2026.1012%2023.639%2026.1232%2023.639C26.167%2023.639%2026.1891%2023.639%2026.2329%2023.5933C26.2764%2023.5476%2026.2764%2023.4564%2026.2329%2023.4107C23.6278%2020.5556%2020.4319%2018.249%2016.8637%2016.7647C15.7692%2016.3078%2015.7692%2016.3078%2015.7692%2016.3078C15.1999%2016.0563%2014.8279%2015.4856%2014.8279%2014.8232C14.8935%2012.3795%2020.4099%2012.882%2020.9791%2011.7171C21.0668%2011.5116%2021.0668%2011.5116%2021.0668%2011.5116C19.9284%2010.4838%2018.5929%209.73024%2017.1046%209.2964C17.0828%209.36483%2017.0387%209.63882%2017.3451%2010.1641C17.6738%2010.7123%2016.9949%2011.603%2015.988%2010.6439C15.9004%2010.5752%2015.9004%2010.5752%2015.9004%2010.5752C8.58908%203.58648%205.21819%208.19991%200.2491%200.0695199C0.20529%200.000828303%200.139698%20-0.0218967%200.0738597%200.0238116C0.00826853%200.0695199%20-0.0137602%200.137953%200.00826853%200.206386C3.92666%2010.0499%2011.9384%207.97163%2012.8797%2017.1528C12.9235%2017.4955%2013.1644%2017.7695%2013.4926%2017.8152C17.9362%2018.546%2022.2707%2020.4645%2026.0358%2023.6163H26.0576'%20fill='%23E40000'/%3e%3c/svg%3e"
              />
              <span className="text-[14px] font-medium text-[#323232]">{totalTarget.toLocaleString()}</span>
              <span className="text-[10px] font-medium text-gray-400 uppercase ml-1">PTS</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] font-sans text-[#323232] flex flex-col items-center">
      <div className="w-full max-w-[1440px] relative flex flex-col pb-0">
        <Header
          isMobile={false}
          onProfileClick={() => goTo(0)}
          activeTab="For you"
          onTabClick={(tab) => {
            if (tab === 'Earn and use points') goTo(3);
          }}
          onTimePasses={handleTimePasses}
          onSettingsClick={() => goTo(7)}
        />

        <div className="w-full bg-white rounded-b-[64px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-2 relative pb-10 xl:pb-[45px]">
          <div className="w-full max-w-[1218px] mx-auto px-4 xl:px-0 pt-[40px]">

            {/* --- Top Global Header --- */}
            <div className="flex justify-between items-start mb-6 relative z-50">
              <div className="flex flex-col">
                <h1 className="text-[32px] font-normal text-[#323232] mb-1" style={{ fontFamily: 'Qantas Sans, sans-serif' }}>
                  Good morning, {slot?.name || 'William'}
                </h1>
                <p className="text-[14px] text-[#323232] font-normal" style={{ fontFamily: 'Qantas Sans, sans-serif' }}>Let's get started</p>
              </div>

              {!isIntroState && (() => {
                const totalTarget = Object.values(current.monthlyTargetByWTE || {}).reduce((a, b) => a + b, 0);
                const totalEarned = Object.values(current.monthlyEarnedByWTE || {}).reduce((a, b) => a + b, 0);
                const progressPercent = totalTarget > 0 ? (totalEarned / totalTarget) * 100 : 0;

                return (
                  <div className="absolute left-1/2 -translate-x-[55%] flex items-center justify-center pt-4 z-[100]">
                    <div
                      onClick={() => setShowMonthlyTargetModal(true)}
                      className="relative cursor-pointer hover:scale-[1.02] transition-transform active:scale-[0.98] group"
                    >
                      <svg className="absolute inset-0 w-full h-full pointer-events-none top-0 left-0" style={{ overflow: 'visible' }}>
                        <rect x="2" y="2" style={{ width: 'calc(100% - 4px)', height: 'calc(100% - 4px)' }} rx="16" fill="none" stroke="#BCE5E5" strokeWidth="4" />
                        <rect x="2" y="2" style={{ width: 'calc(100% - 4px)', height: 'calc(100% - 4px)' }} rx="16" fill="none" stroke="#237271" strokeWidth="4" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - Math.min(100, progressPercent)} strokeLinecap="round" className="transition-all duration-1000" />
                      </svg>
                      <div className="flex items-baseline bg-[#D7F1F0] rounded-full px-[14px] py-[4px] m-[4px]">
                        <span className="text-[15px] text-[#323232] mr-1.5 font-normal">{displayMonthName} Target:</span>
                        <span className="text-[15px] font-bold text-[#323232] tracking-tight">{totalTarget.toLocaleString()}</span>
                        <span className="text-[11px] font-medium text-[#323232] ml-1 uppercase">PTS</span>
                      </div>
                    </div>
                    {showMonthlyTargetModal && <MonthlyTargetModal />}
                  </div>
                );
              })()}

              <div className="text-right flex items-center gap-5">
                <div className="text-right flex flex-col justify-center">
                  <p className="text-[20px] text-[#323232] leading-none mb-1 font-['Ciutadella'] tracking-tight">Bronze</p>
                  <p className="text-[14px] text-[#323232] leading-none tracking-normal">Frequent Flyer 1234 567 890</p>
                </div>
                <div className="w-[52px] h-[52px] bg-[#E40000] rounded-full flex items-center justify-center shadow-sm relative">
                  <img src={PointsRooLogo} alt="" className="w-7 h-7 brightness-0 invert object-contain" />
                </div>
              </div>
            </div>

            {/* --- Lower Panel Content --- */}
            <div className="w-full">
              {helpMeWteId ? (() => {
                const numericId = Number(helpMeWteId);
                const wte = WTEs.find(w => w.id === numericId);
                if (!wte) return null;
                const earned = (current.monthlyEarnedByWTE || {})[numericId] || 0;
                const target = (current.monthlyTargetByWTE || {})[numericId] || 1;
                const percent = earned > 0 ? Math.min(100, Math.round((earned / target) * 100)) : 0;

                return (
                  <div className="flex flex-col xl:flex-row gap-8 items-center justify-start mt-8">
                    {/* Left: Circle UI */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center transform scale-90 ml-2 xl:ml-8">
                      <span className="text-[14px] font-bold text-[#666] text-center mb-3 max-w-[120px] leading-tight flex items-center justify-center min-h-[40px]">
                        {wte.name}
                      </span>
                      <div className="relative w-[120px] h-[120px] mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="60" cy="60" r="56" fill="none" stroke="#F3F5F7" strokeWidth="4" />
                          <circle
                            cx="60" cy="60" r="56" fill="none"
                            stroke="#E40000"
                            strokeWidth="4"
                            strokeDasharray={351.8}
                            strokeDashoffset={351.8 - (351.8 * percent) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 pt-4">
                          <img src={wte.iconSrc} alt={wte.name} className="w-[36px] h-[36px] object-contain shrink-0 mb-2" />
                          <div className="w-[50px] h-px bg-gray-300 mb-2" />
                          <span className="text-[16px] font-medium text-gray-500 leading-none">{earned > 0 ? earned.toLocaleString() : target.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Koala */}
                    <div className="flex-shrink-0 flex items-center justify-center transform scale-90 -mr-4">
                      <KoalaSprite variant="idle" scale={1} />
                    </div>

                    {/* Right: Text and buttons */}
                    <div className="flex-grow max-w-[500px] flex flex-col justify-center min-h-[160px]">
                      {helpPhase === 0 ? (
                        <div className="animate-duo-entrance">
                          <h2 className="text-[22px] text-[#323232] font-normal mb-3 leading-snug">
                            Earn {Math.max(0, target - earned).toLocaleString()} pts on {wte.name}
                          </h2>
                          <div className="min-h-[48px]">
                            <p className="text-[15px] text-[#323232] leading-relaxed mb-6 max-w-[400px]">
                              You've earned <strong>{earned.toLocaleString()} pts</strong> this month. {Math.max(0, target - earned) > 0 ? (
                                <span>Let's look at ways to earn the remaining <strong>{Math.max(0, target - earned).toLocaleString()} pts</strong> to hit your target!</span>
                              ) : (
                                <span className="text-[#00a600] font-medium">You have reached your target! Let's maximise it.</span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <button
                              className="bg-white text-[#E40000] px-6 py-2 rounded-full border border-[1px] border-red-200 font-semibold text-[15px] hover:bg-red-50 transition-all active:scale-95 shadow-sm"
                              onClick={() => setHelpPhase(1)}
                            >
                              Let's go
                            </button>
                            <button
                              onClick={() => { setHelpMeWteId(null); setHelpPhase(0); }}
                              className="text-[#E40000] text-[15px] font-normal hover:underline"
                            >
                              Skip
                            </button>
                          </div>
                        </div>
                      ) : helpPhase === 1 ? (() => {
                        const favs = current?.wteFavourites?.[wte.id] || [];
                        const hasFavs = favs.length > 0;
                        const subNamesMap = wteSubItems[wte.id] || {};

                        return (
                          <div className={`animate-duo-entrance flex items-start ${hasFavs ? 'gap-10 w-full min-w-[700px]' : ''}`}>
                            <div className="flex-1 shrink-0">
                              <h2 className="text-[20px] text-[#323232] font-normal mb-3 leading-snug">
                                {hasFavs ? "Tip 1: Maximise your usage" : "Tip 1: Maximise everyday usage"}
                              </h2>
                              <div className="min-h-[48px]">
                                {hasFavs ? (
                                  <p className="text-[15px] text-[#323232] leading-relaxed mb-6 max-w-[320px]">
                                    Which of these ways to earn might you be able to use this month? Select
                                  </p>
                                ) : (
                                  <p className="text-[15px] text-[#323232] leading-relaxed mb-6 max-w-[400px]">
                                    Ensure you have thoroughly linked your accounts and explore partner offers to boost your earn rate easily.
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-6">
                                <button
                                  className={`bg-white text-[#E40000] px-8 py-2.5 rounded-full border border-[1px] font-medium text-[15px] hover:bg-red-50 transition-all active:scale-95 ${hasFavs ? 'border-gray-200' : 'border-[#E40000] font-semibold shadow-sm'}`}
                                  onClick={() => setHelpPhase(2)}
                                >
                                  {hasFavs ? "Done" : "OK"}
                                </button>
                                <button
                                  onClick={() => { setHelpMeWteId(null); setHelpPhase(0); }}
                                  className="text-[#E40000] text-[15px] font-normal hover:underline"
                                >
                                  Skip
                                </button>
                              </div>
                            </div>

                            {hasFavs && (
                              <div className="flex-1 w-[320px] max-h-[160px] overflow-y-auto pr-4 flex flex-col gap-2 relative scrollbar-hide">
                                {/* Thick pseudo-scrollbar visual track matching figma */}
                                <div className="absolute top-0 right-0 w-[4px] h-full bg-[#E5E5E5] rounded-full" />

                                {favs.map(subId => {
                                  let itemData = subNamesMap[subId] || { name: `Item ${subId}`, category: "" };
                                  if (typeof itemData === 'string') itemData = { name: itemData, category: "" };
                                  return (
                                    <div key={subId} className="bg-[#fafafa] px-5 py-3.5 min-h-[64px] flex flex-col justify-center cursor-pointer hover:bg-gray-50 transition-colors shrink-0 mr-4 border border-transparent hover:border-gray-200">
                                      <span className="text-[14px] font-medium text-[#323232] leading-tight mb-0.5">{itemData.name}</span>
                                      {itemData.category && (
                                        <span className="text-[12px] font-normal text-[#888] leading-none mt-1">{itemData.category}</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })() : (
                        <div className="animate-duo-entrance">
                          <h2 className="text-[20px] text-[#323232] font-normal mb-3 leading-snug">
                            Tip 2: Look out for multipliers
                          </h2>
                          <div className="min-h-[48px]">
                            <p className="text-[15px] text-[#323232] leading-relaxed mb-6 max-w-[400px]">
                              Keep an eye out for promotional bonus points campaigns across {wte.name}.
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <button
                              className="bg-white text-[#E40000] px-6 py-2.5 rounded-full border border-[2px] border-[#E40000] font-semibold text-[15px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                              onClick={() => { setHelpMeWteId(null); setHelpPhase(0); }}
                            >
                              Got it
                            </button>
                            <button
                              onClick={() => { setHelpMeWteId(null); setHelpPhase(0); }}
                              className="text-[#E40000] text-[15px] font-normal hover:underline"
                            >
                              Skip
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })() : isIntroState ? (
                <div className="flex flex-col xl:flex-row gap-8 items-center justify-start mt-8">
                  {/* Left: Koala Sprite */}
                  <div className="flex-shrink-0 flex items-center justify-center transform scale-90">
                    <KoalaSprite variant={introPhase === 0 ? "magic" : "idle"} scale={introPhase === 0 ? 0.6 : 1} />
                  </div>

                  {/* Middle: Intro Content */}
                  <div className="flex-grow max-w-[600px] min-h-[160px]">
                    {introPhase === 0 ? (
                      <>
                        <h2 className="text-[20px] text-[#323232] font-normal mb-3 min-h-[30px]">
                          <HTMLTypewriter html={`Welcome to the program, ${slot?.name.split(' ')[0] || 'Member'}!`} speed={40} onComplete={() => setHeadlineDone(true)} />
                        </h2>
                        <div className="min-h-[48px]">
                          {headlineDone && (
                            <p className="text-[15px] text-gray-800 leading-relaxed mb-4">
                              <HTMLTypewriter html="I'd like to give you 100 pts as a welcome gift" speed={40} onComplete={() => setTypewriterDone(true)} />
                            </p>
                          )}
                        </div>
                        <div className={`flex mt-4 ${typewriterDone ? 'animate-duo-entrance visible' : 'invisible'}`}>
                          <button
                            onClick={handleAcceptWelcome}
                            className="bg-white text-[#E40000] px-6 py-2.5 rounded-full border border-[2px] border-[#E40000] font-semibold text-[15px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                          >
                            Accept 100 pts
                          </button>
                        </div>
                      </>
                    ) : introPhase === 1 ? (
                      <>
                        <h2 className="text-[20px] text-[#323232] font-normal mb-3 min-h-[30px]">
                          <HTMLTypewriter html="OK, 100 pts for you!" speed={40} onComplete={() => setHeadlineDone(true)} />
                        </h2>
                        <div className="min-h-[48px]">
                          {headlineDone && (
                            <p className="text-[15px] text-gray-800 leading-relaxed mb-8">
                              <HTMLTypewriter
                                html="That's better. Starting from zero is no fun at all."
                                speed={30}
                                onComplete={() => setTypewriterDone(true)}
                              />
                            </p>
                          )}
                        </div>

                        <div className={`flex flex-wrap items-center gap-6 mb-4 ${typewriterDone ? 'animate-duo-entrance visible' : 'invisible'}`}>
                          <button
                            onClick={() => {
                              setIntroPhase(2);
                              setHeadlineDone(false);
                              setTypewriterDone(false);
                            }}
                            className="bg-white text-[#E40000] px-6 py-2.5 rounded-full border border-[2px] border-[#E40000] font-semibold text-[15px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                          >
                            Thanks!
                          </button>
                          <button
                            onClick={() => setDashboardIntroDismissed(true)}
                            className="text-[15px] text-[#E40000] font-medium hover:underline"
                          >
                            Skip
                          </button>
                        </div>
                      </>
                    ) : introPhase === 2 ? (
                      <>
                        <h2 className="text-[20px] text-[#323232] font-normal mb-3 min-h-[30px]">
                          <HTMLTypewriter html="Let's get you some more points." speed={40} onComplete={() => setHeadlineDone(true)} />
                        </h2>
                        <div className="min-h-[48px]">
                          {headlineDone && (
                            <p className="text-[15px] text-gray-800 leading-relaxed mb-8">
                              <HTMLTypewriter
                                html="One of the best ways to get the most out of your membership is by finding <strong>a few different ways</strong> of earning points.<br/>You can add some to this <strong>For you</strong> page."
                                speed={30}
                                onComplete={() => setTypewriterDone(true)}
                              />
                            </p>
                          )}
                        </div>

                        <div className={`flex flex-wrap items-center gap-6 mb-4 ${typewriterDone ? 'animate-duo-entrance visible' : 'invisible'}`}>
                          <button
                            onClick={() => {
                              setIntroPhase(3);
                              setHeadlineDone(false);
                              setTypewriterDone(false);
                            }}
                            className="bg-white text-[#E40000] px-6 py-2.5 rounded-full border border-[2px] border-[#E40000] font-semibold text-[15px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                          >
                            Show me!
                          </button>
                          <button
                            onClick={() => goTo(4)}
                            className="text-[#E40000] text-[15px] font-medium hover:underline"
                          >
                            Choose favourite reward
                          </button>
                          <button
                            onClick={() => setDashboardIntroDismissed(true)}
                            className="text-[15px] text-[#E40000] font-medium hover:underline"
                          >
                            Skip
                          </button>
                        </div>
                      </>
                    ) : introPhase === 3 ? (
                      <>
                        <h2 className="text-[20px] text-[#323232] font-normal mb-3 min-h-[30px]">
                          <HTMLTypewriter html="Choose how you want to earn" speed={40} onComplete={() => setHeadlineDone(true)} />
                        </h2>
                        <div className="min-h-[48px]">
                          {headlineDone && (
                            <p className="text-[15px] text-gray-800 leading-relaxed mb-8">
                              <HTMLTypewriter
                                html="You will see lots of <b>different ways</b> that you can earn. You can <b>choose a few</b> that look good initially. Don't worry, you can change these at any time!"
                                speed={30}
                                onComplete={() => setTypewriterDone(true)}
                              />
                            </p>
                          )}
                        </div>

                        <div className={`flex flex-wrap items-center gap-6 mb-4 ${typewriterDone ? 'animate-duo-entrance visible' : 'invisible'}`}>
                          <button
                            onClick={() => {
                              setIntroPhase(4);
                              setHeadlineDone(false);
                              setTypewriterDone(false);
                            }}
                            className="bg-white text-[#E40000] px-6 py-2.5 rounded-full border border-[2px] border-[#E40000] font-semibold text-[15px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                          >
                            OK!
                          </button>
                          <button
                            onClick={() => setDashboardIntroDismissed(true)}
                            className="text-[15px] text-[#E40000] font-medium hover:underline"
                          >
                            Skip
                          </button>
                        </div>
                      </>
                    ) : introPhase === 4 ? (
                      <>
                        <h2 className="text-[20px] text-[#323232] font-normal mb-3 min-h-[30px]">
                          <HTMLTypewriter html="Add your favourite ways to earn" speed={40} onComplete={() => setHeadlineDone(true)} />
                        </h2>
                        <div className="min-h-[48px]">
                          {headlineDone && (
                            <p className="text-[15px] text-gray-800 leading-relaxed mb-8">
                              <HTMLTypewriter
                                html="Adding these ways to earn to your list adds them as <b>targets.</b> This gives you a <b>target number of points</b> to aim for each month. Then you can imagine what kind <b>rewards</b> you might want."
                                speed={30}
                                onComplete={() => setTypewriterDone(true)}
                              />
                            </p>
                          )}
                        </div>

                        <div className={`flex flex-wrap items-center gap-6 mb-4 ${typewriterDone ? 'animate-duo-entrance visible' : 'invisible'}`}>
                          <button
                            onClick={() => {
                              setIntroPhase(5);
                              setHeadlineDone(false);
                              setTypewriterDone(false);
                            }}
                            className="bg-white text-[#E40000] px-6 py-2.5 rounded-full border border-[2px] border-[#E40000] font-semibold text-[15px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                          >
                            All right!
                          </button>
                          <button
                            onClick={() => setDashboardIntroDismissed(true)}
                            className="text-[15px] text-[#E40000] font-medium hover:underline"
                          >
                            Skip
                          </button>
                        </div>
                      </>
                    ) : introPhase === 5 ? (
                      <>
                        <h2 className="text-[20px] text-[#323232] font-normal mb-3 min-h-[30px]">
                        </h2>
                        <div className="min-h-[48px]">
                          <p className="text-[15px] text-gray-800 leading-relaxed mb-8">
                            <HTMLTypewriter
                              html="Once you have some target ways to earn, they'll appear on this page - your <b>For you</b> page. From here, you can start to learn more about them and I'll help you with <b>next steps</b> to set them up.<br/><br/>How does that sound?"
                              speed={30}
                              onComplete={() => setTypewriterDone(true)}
                            />
                          </p>
                        </div>

                        <div className={`flex flex-wrap items-center gap-6 mb-4 ${typewriterDone ? 'animate-duo-entrance visible' : 'invisible'}`}>
                          <button
                            onClick={() => {
                              setDashboardIntroDismissed(true);
                              goTo(3);
                            }}
                            className="bg-white text-[#E40000] px-6 py-2.5 rounded-full border border-[2px] border-[#E40000] font-semibold text-[15px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                          >
                            Sounds good
                          </button>
                          <button
                            onClick={() => setDashboardIntroDismissed(true)}
                            className="text-[15px] text-[#E40000] font-medium hover:underline"
                          >
                            Skip
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>

                  {/* Right: Illustration */}
                  <div className="flex-shrink-0 flex justify-end">
                    <div className="flex items-end gap-6">
                      {/* Step 1: Choose */}
                      <div className={`flex flex-col items-center transition-all duration-300 ${introPhase >= 3 && introPhase !== 3 ? 'opacity-40 grayscale' : 'opacity-100'} ${introPhase === 3 ? 'scale-110 drop-shadow-md' : 'scale-100'}`}>
                        <div className={`w-[124px] h-[124px] rounded-[16px] flex items-center justify-center relative shadow-sm mb-3 overflow-hidden ${introPhase === 3 ? 'bg-white ring-2 ring-[#E40000]' : 'bg-[#F7F7F7]'}`}>
                          <img src={imgChoose} alt="Choose" className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[14px] font-medium ${introPhase === 3 ? 'text-[#E40000]' : 'text-[#323232]'}`}>Choose</span>
                      </div>

                      {/* Step 2: Add */}
                      <div className={`flex flex-col items-center transition-all duration-300 ${introPhase >= 3 && introPhase !== 4 ? 'opacity-40 grayscale' : 'opacity-100'} ${introPhase === 4 ? 'scale-110 drop-shadow-md' : 'scale-100'}`}>
                        <div className={`w-[124px] h-[124px] rounded-[16px] flex items-center justify-center relative shadow-sm mb-3 overflow-hidden ${introPhase === 4 ? 'bg-white ring-2 ring-[#E40000]' : 'bg-[#F7F7F7]'}`}>
                          <img src={imgAdd} alt="Add" className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[14px] font-medium ${introPhase === 4 ? 'text-[#E40000]' : 'text-[#323232]'}`}>Add</span>
                      </div>

                      {/* Step 3: Set up */}
                      <div className={`flex flex-col items-center transition-all duration-300 ${introPhase >= 3 && introPhase !== 5 ? 'opacity-40 grayscale' : 'opacity-100'} ${introPhase === 5 ? 'scale-110 drop-shadow-md' : 'scale-100'}`}>
                        <div className={`w-[124px] h-[124px] rounded-[16px] flex items-center justify-center relative shadow-sm mb-3 overflow-hidden ${introPhase === 5 ? 'bg-white ring-2 ring-[#E40000]' : 'bg-[#F7F7F7]'}`}>
                          <img src={imgSetup} alt="Set up" className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[14px] font-medium ${introPhase === 5 ? 'text-[#E40000]' : 'text-[#323232]'}`}>Set up</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start w-full relative">

                  {/* Left: Favourite ways to earn */}
                  <div className="flex-1 min-w-0 mr-8 xl:mr-12 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-[14px] text-black">Target ways to earn:</h3>
                      <button onClick={() => goTo(3)} className="text-[14px] text-[#E40000] underline font-medium">Edit</button>
                    </div>

                    <div className="relative w-full overflow-hidden">
                      {/* Left Gradient Mask & Arrow */}
                      {canScrollLeft && (
                        <div className="absolute -left-2 top-0 bottom-0 w-[140px] bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none flex items-center justify-start pb-12 pl-2">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-[#323232] cursor-pointer pointer-events-auto hover:text-[#E40000] hover:scale-110 transition-all font-bold"
                            onClick={() => {
                              const el = document.getElementById('wte-scroll');
                              if (el) el.scrollBy({ left: -(el.clientWidth * 0.8), behavior: 'smooth' });
                            }}
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Right Gradient Mask & Arrow */}
                      {canScrollRight && (
                        <div className="absolute -right-2 top-0 bottom-0 w-[140px] bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none flex items-center justify-end pb-12">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-[#323232] cursor-pointer pointer-events-auto hover:text-[#E40000] hover:scale-110 transition-all font-bold"
                            onClick={() => {
                              const el = document.getElementById('wte-scroll');
                              if (el) el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' });
                            }}
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </button>
                        </div>
                      )}

                      <div
                        id="wte-scroll"
                        ref={wteScrollRef}
                        className="flex flex-nowrap overflow-x-auto gap-4 xl:gap-6 pb-2 no-scrollbar pr-12 relative"
                        onScroll={(e) => {
                          const { scrollLeft, scrollWidth, clientWidth } = e.target;
                          setCanScrollLeft(scrollLeft > 0);
                          setCanScrollRight(scrollWidth > clientWidth + 2 && scrollLeft + clientWidth < scrollWidth - 2);
                        }}
                      >
                        {selectedWTEs.map(({ id: stringId }) => {
                          const numericId = Number(stringId);
                          const wte = WTEs.find(w => w.id === numericId);
                          if (!wte) return null;

                          const earned = (displayEarnedByWTE || {})[numericId] || (displayEarnedByWTE || {})[String(numericId)] || 0;
                          const target = (current.monthlyTargetByWTE || {})[numericId] || (current.monthlyTargetByWTE || {})[String(numericId)] || 1;
                          const setupSteps = (current.setupProgressByWTE || {})[numericId] || 0;
                          const isActiveAnim = activeAnim && String(activeAnim.wteId) === String(stringId);

                          const percent = earned > 0
                            ? Math.min(100, Math.round((earned / target) * 100))
                            : (setupSteps / 4) * 100;

                          return (
                            <div key={numericId} className={`flex flex-col items-center w-[120px] shrink-0 relative transition-transform duration-500 ease-out ${isActiveAnim ? 'scale-[1.08]' : ''}`}>
                              <span className="text-[14px] font-medium text-[#323232] text-center mb-2 h-[40px] flex items-center justify-center line-clamp-2 leading-tight">
                                {wte.name}
                              </span>
                              <div className="relative w-[100px] h-[100px] mb-4">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="50" cy="50" r="46" fill="none" stroke="#F3F5F7" strokeWidth="4" />
                                  <circle
                                    cx="50" cy="50" r="46" fill="none"
                                    stroke="#E40000"
                                    strokeWidth={isActiveAnim ? "5" : "4"}
                                    strokeDasharray={289}
                                    strokeDashoffset={289 - (289 * percent) / 100}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                    style={isActiveAnim ? { filter: 'drop-shadow(0 0 5px rgba(228,0,0,0.45))' } : {}}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 pt-3">
                                  <img src={wte.iconSrc} alt={wte.name} className={`w-[32px] h-[32px] object-contain shrink-0 mb-1 transition-transform duration-300 ${isActiveAnim ? 'scale-110' : ''}`} />
                                  {isActiveAnim ? (
                                    <PointsDropAnimation addedPts={activeAnim.addedPts} />
                                  ) : (
                                    <>
                                      <div className="w-[40px] h-px bg-gray-300 mb-1.5" />
                                      <span className="text-[14px] font-medium text-gray-500 leading-none">{target.toLocaleString()}</span>
                                    </>
                                  )}
                                </div>
                                {/* Confetti burst */}
                                {isActiveAnim && <ConfettiBurst />}
                              </div>
                              {earned > 0 || current.dashboardIntroDismissed ? (() => {
                                const isAnimating = activeAnim !== null || animationQueue.length > 0;
                                const metTarget = earned >= target;
                                const showHelpMe = !isAnimating && !metTarget && earned > 0;
                                return (
                                  <div className="text-center h-[34px] flex items-center justify-center relative">
                                    {showHelpMe && (
                                      <button onClick={() => { setHelpMeWteId(stringId); setHelpPhase(0); }} className="text-[14px] font-bold text-[#323232] underline decoration-1 hover:text-[#E40000] hover:decoration-[#E40000] transition-colors focus:outline-none cursor-pointer animate-duo-entrance">
                                        Help me
                                      </button>
                                    )}
                                  </div>
                                );
                              })() : (
                                <div className="flex flex-col items-center h-[34px]">
                                  <button
                                    onClick={() => setShowOnboardingId(stringId)}
                                    className="bg-white border border-[#323232] rounded-[24px] px-5 h-[30px] flex items-center justify-center text-[13px] font-medium text-[#323232] hover:bg-gray-50 transition-colors leading-none pb-[1px]"
                                  >
                                    Set up
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Add New Slot */}
                        <div className="flex flex-col items-center w-[120px] shrink-0 opacity-70 hover:opacity-100 cursor-pointer transition-opacity group" onClick={() => goTo(3)}>
                          <span className="text-[14px] font-medium text-center mb-2 h-[40px] flex items-center justify-center leading-tight transition-colors group-hover:text-red-600">Add</span>
                          <div className="w-[100px] h-[100px] rounded-full border border-dashed border-gray-400 flex items-center justify-center text-gray-400 mb-4 transition-colors group-hover:border-red-600 group-hover:text-red-600">
                            <svg className="w-8 h-8 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                        </div>

                        {/* Flexible Promo Slot */}
                        {selectedWTEs.length < 4 && (
                          <div
                            className="flex-1 min-w-[320px] max-w-[650px] rounded-[16px] border border-gray-200 overflow-hidden relative shadow-[0_2px_8px_rgba(0,0,0,0.04)] ml-2 mb-4 mt-[5px]"
                            style={{ cursor: "pointer", height: "258px" }}
                            onClick={() => goTo(3)}
                          >
                            <img src={ArrowUpImage} alt="" className="absolute top-5 right-5 w-full h-full object-cover object-right-top pointer-events-none opacity-80" />
                            <div className="relative p-7 z-10 h-full flex flex-col justify-center pointer-events-none">
                              <h4 className="text-[20px] text-[#323232] font-normal mb-3">Did you know?</h4>
                              <p className="text-[14px] text-[#555555] leading-[1.4] max-w-[340px]">
                                It's much easier to earn quickly towards rewards by earning in more ways. You could be missing out with everyday spend you are already making.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Target Reward & Profile */}
                  <div className="flex flex-col w-[216px] shrink-0 ml-auto">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-[14px] text-black">Target reward and tier:</h3>
                      <button onClick={() => goTo(3)} className="text-[14px] text-[#E40000] underline font-medium">Edit</button>
                    </div>

                    <div className="flex flex-col gap-[14px]">
                      <div className="w-full h-[122px] rounded-[5px] overflow-hidden relative shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-white pointer-events-auto cursor-pointer">
                        {selectedReward ? (
                          <ConnectedRewardCard reward={selectedReward} variant="mini" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => goTo(3)}>
                            <span className="text-[#E40000] text-[13px] font-bold underline">Select a reward</span>
                          </div>
                        )}
                      </div>

                      <div className="w-full h-[122px] rounded-[5px] overflow-hidden relative shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-white pointer-events-auto">
                        <TierCard
                          tierIndex={favouriteTierIndex !== null ? favouriteTierIndex : flightTierIndex}
                          isFavourite={favouriteTierIndex !== null}
                          variant="mini"
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

                </div>
              )}
            </div>
          </div>
        </div>

        <main className="w-full max-w-[1218px] mx-auto px-4 xl:px-0 py-4 mb-8 flex-grow">
          {/* --- Lower Content (Sitting on Grey) --- */}
          <div className="space-y-12">

            {/* --- Flight Search Component --- */}
            <div className="w-full flex flex-col justify-start items-center gap-6 mb-8 pt-4">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="w-full p-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-start items-start">

                  {/* Top Inputs */}
                  <div className="w-full pb-4 inline-flex justify-start items-center gap-4">
                    <div className="flex-1 flex justify-start items-end gap-4">
                      {/* Departure */}
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                        <div className="text-[#323232] text-[14px] font-normal leading-5 pb-1">Departure location</div>
                        <div className="self-stretch h-16 px-4 py-2 bg-[#F5F5F5] rounded-lg inline-flex justify-start items-center cursor-pointer hover:bg-gray-200 transition-colors">
                          <div className="flex-1 flex justify-center items-center gap-3">
                            <img src={iconWheelsUp} alt="Wheels up" className="w-6 h-6 object-contain" />
                            <div className="flex-1 text-[#323232] text-[16px] font-normal leading-6 truncate">SYD, Sydney, Australia</div>
                          </div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                        <div className="text-[#323232] text-[14px] font-normal leading-5 pb-1">Arrival location</div>
                        <div className="self-stretch h-16 px-4 py-2 bg-[#F5F5F5] rounded-lg inline-flex justify-start items-center cursor-pointer hover:bg-gray-200 transition-colors">
                          <div className="flex-1 flex justify-center items-center gap-3">
                            <img src={iconWheelsDown} alt="Wheels down" className="w-6 h-6 object-contain" />
                            <div className="flex-1 text-[#323232] text-[16px] font-normal leading-6 truncate">LHR, London (Heathrow), United...</div>
                          </div>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                        <div className="text-[#323232] text-[14px] font-normal leading-5 pb-1">Travel dates</div>
                        <div className="self-stretch h-16 px-4 py-2 bg-[#F5F5F5] rounded-lg inline-flex justify-start items-center cursor-pointer hover:bg-gray-200 transition-colors">
                          <div className="flex-1 flex justify-center items-center gap-3">
                            <img src={iconCalendar} alt="Calendar" className="w-6 h-6 object-contain" />
                            <div className="flex-1 text-[#323232] text-[16px] font-normal leading-6 truncate">17 Dec 2025</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Controls / Search */}
                  <div className="w-full flex justify-between items-center mt-2">
                    <div className="flex justify-start items-center gap-6">

                      {/* One Way */}
                      <div className="flex justify-start items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors text-[#323232] text-[16px] font-normal">
                        <span>One way</span>
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </div>

                      {/* Adult */}
                      <div className="flex justify-start items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors text-[#323232] text-[16px] font-normal">
                        <img src={iconAdult} alt="Adult" className="w-5 h-5 object-contain" />
                        <span>1 Adult</span>
                      </div>

                      {/* Economy */}
                      <div className="flex justify-start items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors text-[#323232] text-[16px] font-normal">
                        <span>Economy</span>
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </div>

                      {/* Rewards Toggle */}
                      <div className="flex justify-start items-center gap-3 pl-6 border-l border-gray-100 ml-2">
                        <div className="w-6 h-6 flex justify-center items-center rounded-full bg-white border border-gray-300">
                          <img src={iconAward} alt="Rewards" className="w-[14px] h-[14px] object-contain" />
                        </div>
                        <span className="text-[#323232] text-[16px] font-normal">Rewards</span>
                        <div className="w-[36px] h-6 relative cursor-pointer">
                          <div className="w-full h-full left-0 top-0 absolute bg-[#E5E5E5] rounded-xl border border-[#E5E5E5] transition-colors" />
                          <div className="w-5 h-5 left-[2px] top-[1.5px] absolute bg-white rounded-full shadow-sm transition-all" />
                        </div>
                      </div>

                    </div>

                    {/* Search Button */}
                    <button className="h-[48px] px-6 bg-black hover:bg-gray-800 transition-colors rounded-full flex justify-center items-center gap-2 group">
                      <span className="text-white text-[16px] font-bold leading-6">Search flights</span>
                      <img src={iconArrowRight} alt="Search" className="w-5 h-5 object-contain ml-0.5" />
                    </button>

                  </div>
                </div>

                {/* Links Below Search */}
                <div className="px-6 py-6 flex justify-start items-center gap-14">
                  <div className="flex justify-start items-center gap-3 cursor-pointer group">
                    <img src={iconMultiCity} alt="Multi-city" className="w-[28px] h-[28px] object-contain" />
                    <span className="text-[#323232] text-[16px] font-medium leading-6 group-hover:underline">Multi-city</span>
                  </div>

                  <div className="flex justify-start items-center gap-3 cursor-pointer group">
                    <img src={iconMap} alt="Where Can I Go?" className="w-[28px] h-[28px] object-contain" />
                    <span className="text-[#323232] text-[16px] font-medium leading-6 group-hover:underline">Where Can I Go?</span>
                  </div>

                  <div className="flex justify-start items-center gap-3 cursor-pointer group">
                    <img src={iconFlightCredit} alt="Flight Credit" className="w-[28px] h-[28px] object-contain" />
                    <span className="text-[#323232] text-[16px] font-medium leading-6 group-hover:underline">Flight Credit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Section 3: Modular Components (Static) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

              {/* Points detail mockup */}
              <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 flex flex-col justify-between overflow-hidden">
                <div className="p-4 bg-white flex justify-between items-center border-b border-gray-100">
                  <div className="flex-1">
                    <p className="text-[14px] text-gray-500 mb-1 leading-none">Qantas Points</p>
                    <p className="text-[22px] font-medium text-[#323232] leading-none mt-2">146,000</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200 mx-4"></div>
                  <div className="flex-1">
                    <p className="text-[14px] text-gray-500 mb-1 leading-none">Status Credits</p>
                    <p className="text-[22px] font-medium text-[#323232] leading-none mt-2">0</p>
                  </div>
                </div>

                <div className="flex-grow flex flex-col bg-white">
                  <div className="p-4 border-b border-gray-100 flex-grow bg-white">
                    <p className="text-[14px] text-[#323232] font-medium mb-3">Recent activity</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <p className="text-[12px] text-gray-500 pr-2 leading-snug">BONUS POINTS / COMPLETED...</p>
                        <span className="text-[14px] text-[#26A701] whitespace-nowrap">+ 100</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <p className="text-[12px] text-gray-500 pr-2 leading-snug">QF 735 FLEXIBLE ECONOMY/A...</p>
                        <span className="text-[14px] text-[#26A701] whitespace-nowrap">+ 20</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <p className="text-[12px] text-gray-500 pr-2 leading-snug">QANTAS WELLBEING REWARD</p>
                        <span className="text-[14px] text-[#26A701] whitespace-nowrap">+ 100</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white flex justify-between items-center border-t border-gray-50">
                    <div>
                      <p className="text-[15px] text-[#323232] font-medium">Memberships and Tiers</p>
                      <p className="text-[14px] text-gray-500">Bronze</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#E40000] shadow-sm flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.0576 23.6163C26.0794 23.639 26.1012 23.639 26.1232 23.639C26.167 23.639 26.1891 23.639 26.2329 23.5933C26.2764 23.5476 26.2764 23.4564 26.2329 23.4107C23.6278 20.5556 20.4319 18.249 16.8637 16.7647C15.7692 16.3078 15.7692 16.3078 15.7692 16.3078C15.1999 16.0563 14.8279 15.4856 14.8279 14.8232C14.8935 12.3795 20.4099 12.882 20.9791 11.7171C21.0668 11.5116 21.0668 11.5116 21.0668 11.5116C19.9284 10.4838 18.5929 9.73024 17.1046 9.2964C17.0828 9.36483 17.0387 9.63882 17.3451 10.1641C17.6738 10.7123 16.9949 11.603 15.988 10.6439C15.9004 10.5752 15.9004 10.5752 15.9004 10.5752C8.58908 3.58648 5.21819 8.19991 0.2491 0.0695199C0.20529 0.000828303 0.139698 -0.0218967 0.0738597 0.0238116C0.00826853 0.0695199 -0.0137602 0.137953 0.00826853 0.206386C3.92666 10.0499 11.9384 7.97163 12.8797 17.1528C12.9235 17.4955 13.1644 17.7695 13.4926 17.8152C17.9362 18.546 22.2707 20.4645 26.0358 23.6163H26.0576" fill="white" />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-white p-4 border-t border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="text-[15px] text-[#323232] font-medium">My benefits</span>
                    <svg className="w-5 h-5 text-[#323232]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>

              {/* Nova Component placeholders */}
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white border border-gray-100 rounded-[4px] shadow-sm flex flex-col justify-between overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-white">
                    <p className="text-[18px] text-[#323232] py-1 font-medium">[NOVA COMPONENT]</p>
                  </div>

                  <div className="flex-grow flex items-center justify-center p-4 bg-white">
                    <p className="text-[16px] text-[#323232] font-normal">TBC</p>
                  </div>

                  <div className="p-4 border-t border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                    <span className="text-[15px] text-[#323232] font-medium">TBC</span>
                    <svg className="w-5 h-5 text-[#323232]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Section 4: Bookings & Upsell (Static) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[20px] text-[#323232] font-normal">Your next booking is in &lt;X weeks&gt;</h3>
                  <button className="text-[16px] text-[#323232] flex items-center gap-2 hover:underline">
                    All bookings
                    <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm text-[#323232]">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </button>
                </div>
                <div className="relative rounded-[4px] overflow-hidden shadow-sm flex flex-col h-[160px]">
                  <img src={imgFlightMelbourne} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 via-zinc-800/60 to-transparent top-auto bottom-0 h-28"></div>
                  <div className="absolute inset-0 pb-4 flex flex-col justify-end items-center text-center gap-1 z-10">
                    <img src={logoQantasTail} alt="" className="w-7 h-7 object-contain mb-1" />
                    <div className="flex flex-col items-center gap-[2px]">
                      <span className="text-white text-[14px] font-normal leading-tight">Sydney to</span>
                      <span className="text-white text-[18px] font-medium leading-tight">Melbourne</span>
                    </div>
                    <span className="text-white text-[14px] font-normal mt-1">Booking ref: 5ZSHM9 • Tue, 19 Apr 2023</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-[20px] text-[#323232] font-normal mb-6">Complete your trip</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 h-[160px]">
                  <div className="bg-white border border-gray-100 rounded-[4px] p-3.5 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                    <img src={iconHotelBed} alt="" className="w-7 h-7 mb-2 object-contain" />
                    <div className="flex flex-col gap-0.5 flex-grow mt-1">
                      <p className="text-[14px] text-[#323232] font-normal leading-tight mb-1">Book with Qantas hotels</p>
                      <p className="text-[13px] text-gray-500 font-normal leading-tight">Earn 3 PTS per $1 spent</p>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-[4px] p-3.5 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                    <img src={iconCar} alt="" className="w-7 h-7 mb-2 object-contain" />
                    <div className="flex flex-col gap-0.5 flex-grow mt-1">
                      <p className="text-[14px] text-[#323232] font-normal leading-tight mb-1">Hire a car</p>
                      <p className="text-[13px] text-gray-500 font-normal leading-tight">Earn 4 PTS per $1 spent with Avis</p>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-[4px] p-3.5 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                    <img src={iconPlaneProtection} alt="" className="w-7 h-7 mb-2 object-contain" />
                    <div className="flex flex-col gap-0.5 flex-grow mt-1">
                      <p className="text-[14px] text-[#323232] font-normal leading-tight mb-1">Qantas Travel Insurance</p>
                      <p className="text-[13px] text-gray-500 font-normal leading-tight">Earn 1 point per $1 spent</p>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-[4px] p-3.5 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                    <img src={iconCreditCards} alt="" className="w-7 h-7 mb-2 object-contain" />
                    <div className="flex flex-col gap-0.5 flex-grow mt-1">
                      <p className="text-[14px] text-[#323232] font-normal leading-tight mb-1">Qantas Travel Money</p>
                      <p className="text-[13px] text-gray-500 font-normal leading-tight">Earn 1.5 points for every A$1 spent overseas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Section 4.5: Qantas travel credit and Complimentary Lounge Invitations --- */}
            <div className="mb-12 flex flex-col space-y-4">
              <h3 className="text-[20px] text-[#323232] font-normal">Qantas travel credit and Complimentary Lounge Invitations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Qantas Passes */}
                <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <img src={iconBoardingPass} alt="Qantas Passes" className="w-[32px] h-[32px] mr-4 object-contain" />
                  <div className="flex-grow flex flex-col">
                    <span className="text-[16px] text-[#323232] font-medium mb-1">Qantas Passes</span>
                    <span className="text-[13px] text-[#666]">
                      <a href="#" className="text-[#E40000] underline hover:no-underline font-medium">Learn more</a> about Qantas Passes
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <div className="bg-[#E5E5E5] px-2.5 py-0.5 rounded text-[14px] font-medium text-[#323232]">2</div>
                    <svg className="w-5 h-5 text-[#323232]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>

                {/* Complimentary Lounge Invitations */}
                <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <img src={iconLounge} alt="Complimentary Lounge Invitations" className="w-[32px] h-[32px] mr-4 object-contain" />
                  <div className="flex-grow flex flex-col">
                    <span className="text-[16px] text-[#323232] font-medium mb-1">Complimentary Lounge Invitations</span>
                    <span className="text-[13px] text-[#666]">Expires 31 Dec 2023.</span>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <div className="bg-[#E5E5E5] px-2.5 py-0.5 rounded text-[14px] font-medium text-[#323232]">3</div>
                    <svg className="w-5 h-5 text-[#323232]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>

              </div>
            </div>

            {/* --- Section 4.6: Maximise your membership --- */}
            <div className="mb-12 flex flex-col space-y-4">
              <h3 className="text-[20px] text-[#323232] font-normal">Maximise your membership</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 flex overflow-hidden">
                  <div className="p-4 flex flex-col justify-start items-center">
                    <img src={logoEDR} alt="Everyday Rewards" className="w-[48px] h-[48px] object-contain" />
                  </div>
                  <div className="py-4 pr-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-[15px] text-[#323232] font-medium leading-snug mb-1">Earn with Everyday Rewards</h4>
                      <p className="text-[13px] text-[#666] leading-snug mb-3">Earn Qantas Points by linking Everyday Rewards to your account. <a href="#" className="underline">T&amp;C&apos;s apply</a></p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-[13px] text-[#E40000] font-medium leading-normal hover:underline">Start earning points</button>
                      <button className="text-[13px] text-gray-500 font-normal leading-normal hover:text-[#323232] transition-colors">Not now</button>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 flex overflow-hidden">
                  <div className="p-4 flex flex-col justify-start items-center">
                    <img src={logoUpgrade} alt="Upgrade to business class" className="w-[48px] h-[48px] object-contain" />
                  </div>
                  <div className="py-4 pr-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-[15px] text-[#323232] font-medium leading-snug mb-1">Upgrade to business class</h4>
                      <p className="text-[13px] text-[#666] leading-snug mb-3">Use your points to upgrade to business class on your next flight. <a href="#" className="underline">T&amp;C&apos;s apply</a></p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-[13px] text-[#E40000] font-medium leading-normal hover:underline">Upgrade</button>
                      <button className="text-[13px] text-gray-500 font-normal leading-normal hover:text-[#323232] transition-colors">Not now</button>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 flex overflow-hidden">
                  <div className="p-4 flex flex-col justify-start items-center">
                    <img src={logoPoints} alt="Points balance growing" className="w-[48px] h-[48px] object-contain" />
                  </div>
                  <div className="py-4 pr-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-[15px] text-[#323232] font-medium leading-snug mb-1">Your points balance is growing</h4>
                      <p className="text-[13px] text-[#666] leading-snug mb-3">From flights to hotel stays, discover what you can get with 50,000 PTS. <a href="#" className="underline">T&amp;C&apos;s apply</a></p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-[13px] text-[#E40000] font-medium leading-normal hover:underline">Learn more</button>
                      <button className="text-[13px] text-gray-500 font-normal leading-normal hover:text-[#323232] transition-colors">Not now</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* --- Section 4.7: Book and explore (Static) --- */}
            <div className="mb-12 flex flex-col space-y-4">
              <h3 className="text-[20px] text-[#323232] font-normal">Book and explore</h3>
              <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 p-2 flex items-stretch w-full overflow-x-auto whitespace-nowrap hide-scrollbar">
                {exploreItems.map((item, idx) => (
                  <div key={idx} className="flex-1 flex items-center justify-center min-w-[120px] relative">
                    <div className="px-2 py-3 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center space-y-2 rounded-md transition-colors w-full h-full">
                      {item.isAll ? (
                        <div className="h-8 flex items-center justify-center text-[#323232] mb-1">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="5" cy="12" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="19" cy="12" r="2" />
                          </svg>
                        </div>
                      ) : (
                        <img src={item.icon} alt={item.name} className="h-8 object-contain mb-1" />
                      )}
                      <span className="text-[14px] text-[#323232] text-center">{item.name}</span>
                    </div>
                    {idx < exploreItems.length - 1 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-gray-100"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* --- Section 5: Offers & Use my points --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left: My offers */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[20px] text-[#323232] font-normal">My offers</h3>
                  <button className="text-[14px] text-[#323232] flex items-center hover:underline font-medium">See more <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                  {/* Card 1 */}
                  <div className="bg-white border border-gray-100 rounded-[4px] shadow-sm flex flex-col group relative overflow-hidden h-full">
                    <div className="aspect-[1.8/1] relative flex-shrink-0">
                      <img src={imgRede} alt="Red Energy" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#C2EFE8] text-[#323232] text-[10px] font-medium tracking-wide px-2 py-1 rounded leading-none flex items-center justify-center pt-1.5 pb-1 uppercase">OFFER ENDS SOON</div>
                      <button className="absolute top-3 right-4 w-6 h-6 bg-black text-white hover:bg-gray-800 rounded-full flex items-center justify-center p-1 cursor-pointer transition-colors shadow-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                      <div className="absolute bottom-3 right-4 bg-white p-2 rounded-[4px] shadow flex w-[84px] h-[54px] items-center justify-center">
                        <img src={logoRede} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="text-[15px] font-medium text-[#323232] mb-2 leading-snug">Earn 1 Qantas Point per $1 spent</h4>
                      <p className="text-[13px] text-[#666] mb-4 leading-relaxed flex-grow">Switch to a Qantas Red Saver plan by 27 September for a guaranteed share of three million points.</p>
                      <div className="mt-auto">
                        <a href="#" className="text-[13px] text-gray-400 underline decoration-gray-300 underline-offset-2 hover:text-[#323232] transition-colors">Terms and conditions</a>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 text-center">
                      <button className="text-[#E40000] text-[13px] font-bold tracking-wide uppercase hover:underline">SWITCH NOW</button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white border border-gray-100 rounded-[4px] shadow-sm flex flex-col group relative overflow-hidden h-full">
                    <div className="aspect-[1.8/1] relative flex-shrink-0">
                      <img src={imgCarpetCourt} alt="Carpet Court" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#C2EFE8] text-[#323232] text-[10px] font-medium tracking-wide px-2 py-1 rounded leading-none flex items-center justify-center pt-1.5 pb-1 uppercase">LIMITED OFFER</div>
                      <button className="absolute top-3 right-4 w-6 h-6 bg-black text-white hover:bg-gray-800 rounded-full flex items-center justify-center p-1 cursor-pointer transition-colors shadow-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                      <div className="absolute bottom-3 right-4 bg-white px-2 py-1.5 rounded-[4px] shadow flex w-[96px] h-[48px] items-center justify-center">
                        <img src={logoCarpetCourt} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="text-[15px] font-medium text-[#323232] mb-2 leading-snug">Win 100,000 Qantas Points with Carpet Court</h4>
                      <p className="text-[13px] text-[#666] mb-4 leading-relaxed flex-grow">Simply shop by 30 September 2023 for your chance to win one of 50 prizes of 100,000 Qantas Points.</p>
                      <div className="mt-auto">
                        <a href="#" className="text-[13px] text-gray-400 underline decoration-gray-300 underline-offset-2 hover:text-[#323232] transition-colors">Terms and conditions</a>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 text-center">
                      <button className="text-[#E40000] text-[13px] font-bold tracking-wide uppercase hover:underline">FIND OUT MORE</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Use my points */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[20px] text-[#323232] font-normal">Use my points</h3>
                  <button className="text-[14px] text-[#323232] flex items-center hover:underline font-medium">See more <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                  {/* Card 3 */}
                  <div className="bg-white border border-gray-100 rounded-[4px] shadow-sm flex flex-col relative overflow-hidden h-full">
                    <div className="aspect-[1.8/1] relative flex-shrink-0">
                      <img src={imgSingapore} alt="Singapore" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#C2EFE8] text-[#323232] text-[10px] font-medium tracking-wide px-2 py-1 rounded leading-none flex items-center justify-center pt-1.5 pb-1 uppercase">NEXT AVAILABLE 28 MAY</div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="text-[15px] font-medium text-[#323232] mb-8 leading-snug">Sydney to Singapore</h4>
                      <div className="flex-grow"></div>
                      <div className="mt-auto">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[13px] text-[#666] mb-0.5">Economy one way from</p>
                            <p className="text-[20px] font-medium text-[#323232] leading-none tracking-tight">7,524 PTS<span className="text-[12px] font-normal align-top ml-0.5">~</span></p>
                          </div>
                          <p className="text-[11px] text-[#666] mb-0.5">+AUD $40.26</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 text-center">
                      <button className="text-[#E40000] text-[13px] font-bold tracking-wide uppercase hover:underline">SEARCH FLIGHTS</button>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white border border-gray-100 rounded-[4px] shadow-sm flex flex-col relative overflow-hidden h-full">
                    <div className="aspect-[1.8/1] relative flex-shrink-0">
                      <img src={imgQtGoldcoast} alt="QT Gold Coast" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#C2EFE8] text-[#323232] text-[10px] font-medium tracking-wide px-2 py-1 rounded leading-none flex items-center justify-center pt-1 pb-1 uppercase space-x-1">
                        <img src={iconClassicReward} className="w-[14px] h-[14px]" />
                        <span className="pt-0.5">CLASSIC REWARD</span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="text-[15px] font-medium text-[#323232] mb-1 leading-snug">QT Gold Coast</h4>
                      <div className="flex space-x-[1px] mb-6 mt-1">
                        {[1, 2, 3, 4].map(star => <svg key={star} className="w-[11px] h-[11px] text-[#FFB81C]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                        <svg className="w-[11px] h-[11px] text-gray-200" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      </div>
                      <div className="flex-grow"></div>
                      <div className="mt-auto">
                        <p className="text-[13px] text-[#666] mb-0.5">1 night from</p>
                        <p className="text-[20px] font-medium text-[#323232] leading-none tracking-tight">19,000 PTS<span className="text-[12px] font-normal align-top ml-0.5">~</span></p>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 text-center">
                      <button className="text-[#E40000] text-[13px] font-bold tracking-wide uppercase hover:underline">SEARCH HOTELS</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and conditions block */}
            <div className="border-t border-[#E1E1E1] pt-6 mb-4">
              <h4 className="text-[13px] font-medium text-[#666] mb-3">Terms and conditions</h4>
              <p className="text-[13px] text-[#666] mb-4 leading-relaxed max-w-[90%]">
                You must be a Qantas Frequent Flyer to earn and redeem Qantas Points. A joining fee may apply. Membership and points are subject to the Qantas Frequent Flyer program <a href="#" className="underline">Terms and Conditions</a>.
              </p>
              <button className="text-[13px] text-[#666] flex items-center hover:text-[#323232] transition-colors">
                View all <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>

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
      {/* Sparkle Animations */}
      {shootSparks && (
        <div
          className="fixed animate-shoot-sparkle z-[9999] pointer-events-none"
          style={{
            left: shootSparks.startX - 10,
            top: shootSparks.startY - 10,
            '--tx': `${shootSparks.tx}px`,
            '--ty': `${shootSparks.ty}px`
          }}
        >
          <div className="w-6 h-6 bg-yellow-300 rounded-full blur-[2px] shadow-[0_0_15px_5px_rgba(253,224,71,0.8)]" />
        </div>
      )}
      {scatterSparks && (
        <div className="fixed z-[9999] pointer-events-none" style={{ left: scatterSparks.x, top: scatterSparks.y }}>
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const dist = 40 + Math.random() * 30;
            const sx = Math.cos(angle) * dist;
            const sy = Math.sin(angle) * dist;
            return (
              <div
                key={i}
                className="absolute animate-scatter-sparkle"
                style={{
                  left: -5,
                  top: -5,
                  '--sx': `${sx}px`,
                  '--sy': `${sy}px`
                }}
              >
                <div className="w-3 h-3 bg-yellow-300 rounded-full blur-[1px] shadow-[0_0_10px_3px_rgba(253,224,71,0.8)]" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


