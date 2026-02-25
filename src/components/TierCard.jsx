import React from 'react';

const TIERS = [
    { name: 'Bronze', sc: 0, bgColor: '#E40000', textColor: 'text-white' },
    { name: 'Silver', sc: 300, bgColor: '#A3A5A8', textColor: 'text-white' },
    { name: 'Gold', sc: 700, bgColor: '#C5A059', textColor: 'text-white' },
    { name: 'Platinum', sc: 1400, bgColor: '#2D2D2D', textColor: 'text-white' },
    { name: 'Platinum One', sc: 3600, bgColor: '#EAEAEA', textColor: 'text-[#323232]' },
];

export default function TierCard({ tierIndex = 2, isFavourite = false, onToggleFavourite = null }) {
    const safeIndex = Math.max(0, Math.min(4, tierIndex));
    const tier = TIERS[safeIndex];

    const isLightText = tier.textColor === 'text-white';

    return (
        <div
            className={`relative w-full aspect-[1.8/1] rounded-[14px] overflow-hidden shadow-lg p-4 flex flex-col justify-between ${tier.textColor} group cursor-pointer transition-transform active:scale-[0.98]`}
            style={{ backgroundColor: tier.bgColor }}
            onClick={() => {
                if (onToggleFavourite) {
                    onToggleFavourite();
                }
            }}
        >
            {/* Top Row */}
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-1.5 opacity-90">
                    {/* Simple Qantas Roo Silhouette Logo SVG */}
                    <svg viewBox="0 0 27 24" className={`w-5 h-5 ${isLightText ? 'fill-white' : 'fill-[#E40000]'}`}>
                        <path d="M26.0576 23.6163C26.0794 23.639 26.1012 23.639 26.1232 23.639C26.167 23.639 26.1891 23.639 26.2329 23.5933C26.2764 23.5476 26.2764 23.4564 26.2329 23.4107C23.6278 20.5556 20.4319 18.249 16.8637 16.7647C15.7692 16.3078 15.7692 16.3078 15.7692 16.3078C15.1999 16.0563 14.8279 15.4856 14.8279 14.8232C14.8935 12.3795 20.4099 12.882 20.9791 11.7171C21.0668 11.5116 21.0668 11.5116 21.0668 11.5116C19.9284 10.4838 18.5929 9.73024 17.1046 9.2964C17.0828 9.36483 17.0387 9.63882 17.3451 10.1641C17.6738 10.7123 16.9949 11.603 15.988 10.6439C15.9004 10.5752 15.9004 10.5752 15.9004 10.5752C8.58908 3.58648 5.21819 8.19991 0.2491 0.0695199C0.20529 0.000828303 0.139698 -0.0218967 0.0738597 0.0238116C0.00826853 0.0695199 -0.0137602 0.137953 0.00826853 0.206386C3.92666 10.0499 11.9384 7.97163 12.8797 17.1528C12.9235 17.4955 13.1644 17.7695 13.4926 17.8152C17.9362 18.546 22.2707 20.4645 26.0358 23.6163H26.0576" />
                    </svg>
                    <span className="text-[12px] font-medium tracking-tight">Qantas Frequent Flyer</span>
                </div>
                {/* Favorite Heart - Appears on hover or if isFavourite */}
                <div className={`transition-all duration-300 ${isFavourite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {isFavourite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${isLightText ? 'text-white' : 'text-[#323232]'}`}>
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isLightText ? 'text-white' : 'text-[#323232]'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <span className="text-[11px] font-medium opacity-90 mb-0.5">Status Tier</span>
                    <span className="text-[20px] font-medium tracking-tight leading-none">{tier.name}</span>
                </div>
                {tier.sc >= 0 && (
                    <div className="flex items-center space-x-1 opacity-90">
                        <span className="text-[14px]">★</span>
                        <span className="text-[16px] font-medium">{tier.sc.toLocaleString()}</span>
                        <span className="text-[10px] font-bold uppercase translate-y-[1px]">SC</span>
                    </div>
                )}
            </div>

            {/* Soft gradient shine effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
        </div>
    );
}
