// src/components/RewardCard.jsx
import React from 'react';

export default function RewardCard({
    reward,
    originCity = 'Sydney',
    onOriginClick,
    isFavorited = false,
    onFavoriteClick
}) {
    if (!reward) return null;

    const isFlight = reward.type === 'Classic Flight Reward';

    return (
        <div className="relative w-full aspect-[1.8/1] rounded-[14px] overflow-hidden shadow-lg bg-gray-200">
            {/* Background Image */}
            {reward.imageUrl && (
                <img
                    src={reward.imageUrl}
                    alt={reward.destCity || reward.reward}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* Favourited Heart Icon */}
            {isFavorited && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onFavoriteClick) onFavoriteClick();
                    }}
                    className="absolute top-3 right-3 z-10 animate-in fade-in zoom-in duration-300 cursor-pointer hover:scale-110 transition-transform"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </div>
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                {/* Top: Badge (if flight) or Icon */}
                <div className="flex items-start">
                    {isFlight ? (
                        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/20">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#E40000]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <span className="text-[13px] font-medium">
                                Classic Reward Flight
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            {reward.icon && (
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
                                    <img src={reward.icon} alt="" className="w-7 h-7" />
                                </div>
                            )}
                            <span className="text-[15px] font-medium tracking-tight">
                                {reward.type}
                            </span>
                        </div>
                    )}
                </div>

                {/* Bottom: Destination and Points */}
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <button
                            onClick={(e) => {
                                if (onOriginClick) {
                                    e.stopPropagation();
                                    onOriginClick();
                                }
                            }}
                            className={`text-xs font-semibold opacity-90 drop-shadow-md text-left ${onOriginClick ? 'hover:underline cursor-pointer' : ''}`}
                        >
                            {reward.destCity ? `${originCity} to` : ''}
                        </button>
                        <span className="text-[22px] font-medium drop-shadow-lg leading-tight mb-1">
                            {reward.destCity || reward.reward}
                        </span>
                        {isFlight && (
                            <span className="text-xs font-medium opacity-90">
                                + $180 charges
                            </span>
                        )}
                    </div>

                    <div className="flex items-baseline space-x-1.5 drop-shadow-lg pb-1">
                        <span className="text-[22px] font-medium uppercase">
                            {reward.pts.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold uppercase opacity-80">
                            PTS
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
