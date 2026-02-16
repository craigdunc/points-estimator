import React from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import WelcomeHeroImg from '../assets/images/welcome_hero.png';
import QantasLogo from '../assets/logos/qantas.svg';
import ProfileIcon from '../assets/icons/Profile.svg';
import QantasIDIcon from '../assets/icons/Qantas-ID.svg';
import { useViewportMode } from '../hooks/useViewportMode';

export default function Intro1({ goTo, currentStepIndex }) {
  const { slots, activeSlotId } = useSaveSlots();
  const { isSplitView } = useViewportMode();
  const currentSlot = slots.find(s => s.id === activeSlotId);
  const userName = currentSlot?.name || 'Kim';

  const handleNext = () => {
    goTo(currentStepIndex + 1);
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] flex flex-col font-sans selection:bg-red-100">
      {/* ── HEADER ── */}
      <header className="bg-white border-b border-gray-100 flex items-center justify-between pl-6 sticky top-0 z-50 h-[60px]">
        <div className="flex items-center">
          <img src={QantasLogo} alt="Qantas" className="h-[26px] w-auto" />
        </div>
        <div className="flex items-center h-full">
          <span className="text-[16px] text-[#323232] mr-6">Menu</span>
          <button
            onClick={() => goTo(0)}
            className="h-full flex items-center justify-center text-white transition-colors"
          >
            <div className="w-[60px] h-full bg-[#DF0000] flex items-center justify-center">
              <img src={ProfileIcon} alt="Profile" className="w-[60px] h-[60px]" />
            </div>
          </button>
        </div>
      </header>

      <main className={`flex-grow ${isSplitView ? 'max-w-[1200px] mx-auto w-full px-6 pt-10' : 'pb-12'}`}>

        <div className={`${isSplitView ? 'flex flex-row gap-8 items-start' : 'flex flex-col-reverse'}`}>

          {/* ── LEFT COL (Membership Card on Desktop) ── */}
          <div className={`${isSplitView ? 'w-[380px] shrink-0' : 'px-4 pt-4 pb-4'}`}>
            <div
              className={`bg-white rounded-[12px] flex items-start gap-4 shadow-sm transition-all duration-500 hover:shadow-md ${isSplitView ? 'p-6 border border-gray-100' : 'p-[12px]'}`}
            >
              <div className={`${isSplitView ? 'w-[48px] h-[48px]' : 'w-[42px] h-[42px]'} bg-[#E40000] rounded-full flex items-center justify-center shrink-0`}>
                <img src={QantasIDIcon} alt="" className={`${isSplitView ? 'w-8 h-8' : 'w-8 h-8'}`} />
              </div>
              <div className="flex-1">
                <p className={`${isSplitView ? 'text-[12px]' : 'text-[16px]'} text-[#323232] mb-1 font-medium`}>Membership number</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${isSplitView ? 'text-[24px]' : 'text-[22px]'} font-medium text-[#323232] leading-none`}>1234567890</span>
                  <button className="text-[#929292] hover:text-[#E40000] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
                <p className={`${isSplitView ? 'text-[12px]' : 'text-[14px]'} text-[#626262] leading-relaxed`}>
                  You have been emailed this number and your full membership details.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT COL (Hero Section on Desktop) ── */}
          <div className={`${isSplitView ? 'flex-1' : 'px-4 mb-4'}`}>
            <div
              className={`relative rounded-[12px] overflow-hidden ${isSplitView ? 'min-h-[500px]' : 'min-h-[322px]'} flex flex-col p-6 md:p-10 group shadow-lg transition-all duration-500`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${WelcomeHeroImg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/60" />

              <div className="relative z-10 text-white h-full flex flex-col">
                <h2 className={`${isSplitView ? 'text-[40px]' : 'text-[26px]'} font-medium leading-[1.1] mb-6 drop-shadow-sm`}>
                  Welcome to Qantas<br />Frequent Flyer, {userName}
                </h2>

                <div className={`space-y-4 mb-auto ${isSplitView ? 'max-w-[480px]' : ''}`}>
                  <p className={`${isSplitView ? 'text-[12px]' : 'text-[17px]'} leading-relaxed opacity-95`}>
                    You've just joined a community of Australians who can get a little more of what they love most.
                  </p>
                  <p className={`${isSplitView ? 'text-[12px]' : 'text-[17px]'} font-medium`}>
                    Because points make it possible.
                  </p>
                </div>

                <div className={`${isSplitView ? 'w-[180px]' : 'w-full'} mt-10`}>
                  <button
                    onClick={handleNext}
                    className={`w-full ${isSplitView ? 'py-2 text-[14px]' : 'py-4 text-[17px]'} bg-[#E40000] font-medium tracking-[0.1em] text-white rounded-[6px] active:scale-[0.98] transition-all hover:bg-black hover:shadow-xl`}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE FOOTER SECTIONS (Kept simple) ── */}
        {!isSplitView && (
          <footer className="bg-white border-t border-gray-100 mt-12 overflow-hidden">
            <div className="flex justify-end pt-0 px-4">
              <div className="w-12 h-12 bg-[#626262] flex items-center justify-center text-white cursor-pointer hover:bg-[#323232] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </div>

            <div className="px-6 py-10 space-y-12">
              <section>
                <h3 className="text-[#323232] mb-5 text-[22px]">About Qantas</h3>
                <ul className="space-y-0 text-[15px] text-[#626262]">
                  {['About Us', 'Qantas Group', 'News Room', 'Careers', 'oneword', 'More about Qantas', 'Qantas Group Pilot Academy'].map(item => (
                    <li key={item} className="hover:text-[#E40000] cursor-pointer transition-colors">{item}</li>
                  ))}
                </ul>
              </section>
              {/* ... other sections ... */}
            </div>
          </footer>
        )}
      </main>

      {/* ── DESKTOP FOOTER (Clean horizontal) ── */}
      {isSplitView && (
        <footer className="bg-white border-t border-gray-100 py-8 px-10 mt-20">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 text-[13px] text-[#626262] font-medium">
              <span className="hover:text-red-600 cursor-pointer">Privacy & Security</span>
              <span className="hover:text-red-600 cursor-pointer">Terms of Use</span>
              <span className="hover:text-red-600 cursor-pointer">Help & support</span>
            </div>
            <p className="text-[12px] text-[#929292]">© Qantas Airways Limited ABN 16 009 661 901</p>
          </div>
        </footer>
      )}
    </div>
  );
}
