// src/screens/Intro1.jsx
import React from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import WelcomeHeroImg from '../assets/images/welcome_hero.png';
import QantasLogo from '../assets/logos/qantas.svg';
import ProfileIcon from '../assets/icons/Profile.svg';
import QantasIDIcon from '../assets/icons/Qantas-ID.svg';

export default function Intro1({ goTo, currentStepIndex }) {
  const { slots, activeSlotId } = useSaveSlots();
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
            {/* Using the user's specified red background for the profile button */}
            <div className="w-[60px] h-full bg-[#DF0000] flex items-center justify-center">
              <img src={ProfileIcon} alt="Profile" className="w-[60px] h-[60px]" />
            </div>
          </button>
        </div>
      </header>

      <main className="flex-grow pb-12">
        {/* ── MEMBERSHIP CARD ── */}
        <div className="px-4 pt-4 pb-4">
          <div
            className="bg-white rounded-[12px] flex items-start gap-3 shadow-sm"
            style={{ padding: '12px' }}
          >
            <div className="w-[42px] h-[42px] bg-[#E40000] rounded-full flex items-center justify-center shrink-0">
              <img src={QantasIDIcon} alt="" className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <p className="text-[16px] text-[#323232] mb-1">Membership number</p>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[22px] font-medium text-[#323232] leading-none">1234567890</span>
                <button className="text-[#929292] hover:text-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
              <p className="text-[14px] text-[#626262] max-w-[240px]">
                You have been emailed this number and your full membership details.
              </p>
            </div>
          </div>
        </div>

        {/* ── HERO SECTION ── */}
        <div className="px-4 mb-4">
          <div
            className="relative rounded-[12px] overflow-hidden min-h-[322px] flex flex-col p-5 pt-5 group"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${WelcomeHeroImg})` }}
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

            <div className="relative z-10 text-white h-full flex flex-col">
              <h2 className="text-[26px] font-medium leading-tight">
                Welcome to Qantas<br />Frequent Flyer, {userName}
              </h2>

              <div className="space-y-4 mb-auto">
                <p className="pt-3 text-[17px] max-w-[280px]">
                  You've just joined a community of Australians who can get a little more of what they love most.
                </p>
                <p className="text-[17px]">
                  Because points make it possible.
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 mt-8 bg-[#E40000] font-medium tracking-[0.2em] text-white text-[17px] rounded-[8px] active:scale-[0.98] transition-all hover:bg-red-700"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>

        {/* ── FOOTER SECTIONS ── */}
        <footer className="bg-white border-t border-gray-100 mt-12 overflow-hidden">
          {/* Scroll to top button */}
          <div className="flex justify-end pt-0 px-4">
            <div className="w-12 h-12 bg-[#626262] flex items-center justify-center text-white cursor-pointer hover:bg-[#323232] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>

          <div className="px-6 py-10 space-y-12">
            <div className="space-y-12">
              <section>
                <h3 className="text-[#323232] mb-5 text-[22px]">About Qantas</h3>
                <ul className="space-y-0 text-[15px] text-[#626262]">
                  {['About Us', 'Qantas Group', 'News Room', 'Careers', 'oneword', 'More about Qantas', 'Qantas Group Pilot Academy'].map(item => (
                    <li key={item} className="hover:text-[#E40000] cursor-pointer transition-colors">{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-[#323232] mb-5 text-[22px]">Support</h3>
                <ul className="space-y-0 text-[15px] text-[#626262]">
                  {['Help & Support', 'Contact Us', 'Travel Credits'].map(item => (
                    <li key={item} className="hover:text-[#E40000] cursor-pointer transition-colors">{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-[#323232] mb-5 text-[22px]">Download our app</h3>
                <ul className="space-y-0 text-[15px] text-[#626162]">
                  {['Qantas App iOS', 'Qantas App Android'].map(item => (
                    <li key={item} className="hover:text-[#E40000] cursor-pointer transition-colors">{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-[#323232] mb-5 text-[22px]">Access to great deals</h3>
                <ul className="space-y-0 text-[15px] text-[#626262]">
                  {['Join Qantas Frequent Flyer', 'Subscribe to Red Email'].map(item => (
                    <li key={item} className="hover:text-[#E40000] cursor-pointer transition-colors">{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Social Icons Row */}
            <div className="flex gap-4 border-t border-gray-100 pt-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="w-11 h-11 rounded-full bg-[#F3F5F7] flex items-center justify-center text-[#929292] hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-current rounded-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F8F9FA] px-6 py-12 border-t border-gray-100 text-[#929292]">
            <p className="mb-10 text-[13px] font-medium text-[#626262]">© Qantas Airways Limited ABN 16 009 661 901</p>

            <div className="flex items-center gap-10 mb-10 flex-wrap opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-black text-2xl text-[#E40000] tracking-tighter italic">Jetstar<span className="text-red-500">★</span></span>
              <div className="flex items-center gap-2 py-1 px-2 border border-gray-300 rounded-sm">
                <div className="w-8 h-5 bg-[#005596] rounded-[1px]" />
                <div className="w-10 h-6 bg-[#DEDEDE]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-5 gap-x-8 text-[13px] font-bold text-[#626262] underline decoration-gray-300 underline-offset-4">
              <span className="cursor-pointer hover:text-red-600">Privacy & Security</span>
              <span className="cursor-pointer hover:text-red-600">Terms of Use</span>
              <span className="cursor-pointer hover:text-red-600">Conditions of Carriage</span>
              <span className="cursor-pointer hover:text-red-600">Help and support</span>
              <span className="cursor-pointer hover:text-red-600">Modern Slavery Act Statement [PDF]</span>
              <span className="cursor-pointer hover:text-red-600">Reconciliation Action Plan</span>
              <span className="cursor-pointer hover:text-red-600">Access & Inclusion Plan</span>
              <span className="cursor-pointer hover:text-red-600">Fare Types</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
