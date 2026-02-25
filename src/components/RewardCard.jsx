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
        <div className="relative w-full aspect-[1.8/1] rounded-[14px] overflow-hidden shadow-lg bg-gray-200 group cursor-pointer">
            {/* Background Image */}
            {reward.imageUrl && (
                <img
                    src={reward.imageUrl}
                    alt={reward.destCity || reward.reward}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            )}

            {/* Favourite Heart Icon - Show solid if favourited, outline on hover if not */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    if (onFavoriteClick) onFavoriteClick();
                }}
                className={`absolute top-3 right-3 z-20 cursor-pointer transition-all duration-300 hover:scale-110 ${isFavorited
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                    }`}
            >
                {isFavorited ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                )}
            </div>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                {/* Top: Badge (if flight) or Icon */}
                <div className="flex items-start">
                    {isFlight ? (
                        <div className="flex items-center space-x-1.5 bg-white/15 backdrop-blur-md rounded-full px-1.5 py-1 border border-white/20">
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-[#E40000]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-medium">
                                Classic Reward Flight
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2.5">
                            {reward.icon && (
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
                                    <img src={reward.icon} alt="" className="w-5 h-5" />
                                </div>
                            )}
                            <span className="text-[12px] font-medium tracking-tight">
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
                            className={`text-[10px] font-semibold opacity-90 drop-shadow-md text-left ${onOriginClick ? 'hover:underline cursor-pointer' : ''}`}
                        >
                            {reward.destCity ? `${originCity} to` : ''}
                        </button>
                        <span className="text-[16px] font-medium drop-shadow-lg leading-tight mb-0.5">
                            {reward.destCity || reward.reward}
                        </span>
                        {isFlight && (
                            <span className="text-[10px] font-medium opacity-90">
                                + $180 charges
                            </span>
                        )}
                    </div>

                    <div className="flex items-baseline space-x-1 drop-shadow-lg pb-0.5">
                        <span className="text-[16px] font-medium uppercase">
                            {reward.pts.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-bold uppercase opacity-80">
                            PTS
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
