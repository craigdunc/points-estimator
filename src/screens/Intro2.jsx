import React from 'react';
import DreamingPattern from '../assets/images/dreaming-pattern.png';
import ChooseIcon from '../assets/images/choose.png';
import AddIcon from '../assets/images/add.png';
import SetupIcon from '../assets/images/Setup.png';
import { useViewportMode } from '../hooks/useViewportMode';
import Header from '../components/Header';

export default function Intro2({ goTo, currentStepIndex, dashboardStepIndex = 5 }) {
  const { isSplitView } = useViewportMode();

  const handleShowMe = () => goTo(currentStepIndex + 1);  // go to next (WTESelection)
  const handleSkip = () => goTo(dashboardStepIndex);  // skip to dashboard

  return (
    <div className="min-h-screen bg-[#F3F5F7] flex flex-col font-sans selection:bg-red-100">
      <Header isMobile={!isSplitView} showAccountNav={false} />

      <main className={`flex-grow flex flex-col items-center justify-center p-4 py-8`}>
        {/* ── CENTRAL WHITE CARD ── */}
        <div className={`bg-white rounded-[12px] overflow-hidden flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.04)] ${isSplitView ? 'max-w-[800px]' : 'max-w-[420px]'} mx-auto w-full transition-all duration-500`}>

          {/* ── TOP DECO PATTERN ── */}
          <div className="h-[65px] w-full overflow-hidden shrink-0">
            <img
              src={DreamingPattern}
              alt=""
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          <div className={`flex flex-col ${isSplitView ? 'md:flex-row md:items-stretch' : ''}`}>
            {/* Left/Main Side */}
            <div className={`flex flex-col px-6 pt-1 pb-4 ${isSplitView ? 'md:flex-1 md:py-8 md:pr-8' : ''}`}>
              <h1 className={`${isSplitView ? 'text-[32px]' : 'text-[26px]'} text-[#000000] leading-tight mb-3 transition-all`}>
                Let’s get you some points
              </h1>

              <div className="space-y-3 mb-8">
                <p className={`${isSplitView ? 'text-[12px]' : 'text-[16px]'} text-[#323232] leading-relaxed`}>
                  One of the best ways to get the most out of your membership is by finding <span className="font-bold">a few different ways</span> of earning points.
                </p>
                <p className={`${isSplitView ? 'text-[12px]' : 'text-[16px]'} text-[#323232] leading-relaxed`}>
                  You can add some to your <span className="font-bold">account homepage.</span>
                </p>
              </div>

              {/* Mobile Buttons */}
              {!isSplitView && (
                <div className="flex flex-col space-y-4 mt-4">
                  <button
                    onClick={handleShowMe}
                    className="w-full py-4 bg-[#E40000] font-medium tracking-[0.2em] text-white text-[17px] rounded-[8px] active:scale-[0.98] transition-all hover:bg-red-700"
                  >
                    SHOW ME
                  </button>
                  <button onClick={handleSkip} className="w-full text-center text-[16px] font-medium text-[#E40000] active:opacity-70 transition-opacity">
                    Skip
                  </button>
                </div>
              )}
            </div>

            {/* Right/Secondary Side (Desktop Grid + Buttons) */}
            <div className={`flex flex-col px-6 pt-1 pb-6 bg-gray-50/50 ${isSplitView ? 'md:w-[320px] md:pt-8 md:bg-white md:border-l md:border-gray-50' : ''}`}>
              {/* ── ICON GRID ── */}
              <div className={`grid grid-cols-3 gap-5 ${isSplitView ? 'mb-8' : 'mb-5'}`}>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square bg-[#F3F5F7] rounded-[16px] flex items-center justify-center p-3 mb-2">
                    <img src={ChooseIcon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[12px] font-medium text-[#323232]">Choose</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square bg-[#F3F5F7] rounded-[16px] flex items-center justify-center p-3 mb-2">
                    <img src={AddIcon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[12px] font-medium text-[#323232]">Add</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square bg-white border border-gray-100 rounded-[16px] flex items-center justify-center p-3 mb-2 shadow-sm">
                    <img src={SetupIcon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[12px] font-medium text-[#323232]">Set up</span>
                </div>
              </div>

              {/* ── BUTTONS (Desktop) ── */}
              {isSplitView && (
                <div className="space-y-4">
                  <button
                    onClick={handleShowMe}
                    className="w-full py-2 bg-[#E40000] font-medium tracking-[0.1em] text-white text-[14px] rounded-[6px] active:scale-[0.98] transition-all hover:bg-black"
                  >
                    SHOW ME
                  </button>
                  <button
                    onClick={handleSkip}
                    className="w-full text-center text-[12px] font-medium text-[#E40000] active:opacity-70 transition-opacity"
                  >
                    Skip
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── SEE REWARDS LINK ── */}
      <div className="pb-10 flex justify-center">
        <button
          onClick={() => goTo(3)}
          className="text-center text-[14px] text-[#666666] underline hover:text-[#323232] transition-colors"
        >
          See rewards
        </button>
      </div>
    </div>
  );
}
