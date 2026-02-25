import React from 'react';
import QantasLogo from '../assets/logos/qantas.svg';
import { useSaveSlots } from '../state/useSaveSlots';

const oneWorldLogo = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#00358E" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" fill="#00358E" />
    </svg>
);

const auFlag = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#00008B" />
        <path d="M0 0L10 6.6L20 0M0 20L10 13.4L20 20M10 0V20M0 10H20" stroke="white" strokeWidth="1" />
    </svg>
);

const cartIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const ChevronDown = () => (
    <svg className="w-3 h-3 ml-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export default function Header({ isMobile, showAccountNav = true, onProfileClick, activeTab = 'Earn and use points', onTabClick }) {
    const { slots, activeSlotId, current } = useSaveSlots() || {};
    const activeSlot = slots?.find(s => s.id === activeSlotId);
    const slotName = activeSlot?.name || 'Craig Duncan';
    const pointsBalance = current?.currentPtsBalance !== undefined ? current.currentPtsBalance : 144513;

    const getInitials = (name) => {
        if (!name) return 'CD';
        const words = name.trim().split(' ').filter(Boolean);
        if (words.length === 1) {
            return name.substring(0, 2).toUpperCase();
        }
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    const initials = getInitials(slotName);
    const formattedPoints = new Intl.NumberFormat().format(pointsBalance);

    if (isMobile) {
        return (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <img src={QantasLogo} alt="Qantas" className="h-6" />
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onProfileClick}
                        className="bg-[#E40000] text-white text-[10px] font-bold px-2 py-1 rounded-full cursor-pointer hover:bg-red-700 transition-colors"
                    >
                        {initials} {formattedPoints} pts
                    </button>
                    {cartIcon}
                </div>
            </div>
        );
    }

    return (
        <header className="w-full bg-white font-sans">
            {/* Layer 1: Global Bar */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src={QantasLogo} alt="Qantas" className="h-10" />
                    <div className="w-px h-8 bg-gray-200" />
                    {oneWorldLogo}
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-[13px] font-medium text-[#323232]">
                        {auFlag}
                        <span>AU | EN</span>
                    </div>
                    <button className="text-gray-600 hover:text-black">
                        {cartIcon}
                    </button>
                    <button
                        onClick={onProfileClick}
                        className="flex items-center bg-[#E40000] text-white rounded-full pl-1 pr-4 py-1.5 shadow-sm overflow-hidden hover:bg-red-700 transition-colors cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-[11px] font-bold border border-white/20 mr-2">
                            {initials}
                        </div>
                        <span className="text-[14px] font-bold tracking-tight">{formattedPoints} points</span>
                    </button>
                </div>
            </div>

            {/* Layer 2: Main Navigation */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8 py-3 flex justify-between items-center bg-white border-t border-gray-50">
                <nav className="flex items-center space-x-8">
                    {[
                        'Flights', 'Travel', 'Shop', 'Banking & Insurance', 'Frequent Flyer', 'Qantas for Business'
                    ].map((item) => (
                        <button key={item} className="flex items-center text-[15px] text-[#323232] hover:text-[#E40000] font-medium transition-colors">
                            {item}
                            <ChevronDown />
                        </button>
                    ))}
                </nav>
                <button className="text-[14px] text-[#323232] hover:underline font-medium">Help</button>
            </div>

            {/* Layer 3: Account Navigation */}
            {showAccountNav && (
                <div className="w-full bg-[#323232]">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8 flex justify-between items-center">
                        <nav className="flex items-center h-14">
                            <button className="px-5 text-[14px] text-white font-medium hover:bg-white/10 h-full transition-colors border-r border-white/10">
                                My Account
                            </button>
                            <div className="flex items-center h-full">
                                {[
                                    'For you', 'Activity statement', 'My trips', 'Earn and use points', 'Status & benefits'
                                ].map((item) => {
                                    const isActive = item === activeTab;
                                    return (
                                        <button
                                            key={item}
                                            onClick={() => onTabClick && onTabClick(item)}
                                            className={`px-5 text-[14px] font-medium h-full transition-colors relative flex items-center ${isActive
                                                ? 'text-white'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {item}
                                            {isActive && (
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E40000]" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </nav>
                        <button className="border border-white/40 hover:border-white text-white text-[13px] font-bold px-5 py-1.5 rounded-full transition-colors">
                            Settings
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
