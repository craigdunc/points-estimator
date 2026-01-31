// src/components/RewardCard.jsx
import React from 'react';

export default function RewardCard({ reward }) {
    if (!reward) return null;

    return (
        <div className="relative w-full aspect-[1.8/1] rounded-xl overflow-hidden shadow-lg bg-gray-200">
            {/* Background Image */}
            {reward.imageUrl && (
                <img
                    src={reward.imageUrl}
                    alt={reward.destCity || reward.reward}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                {/* Top: Icon and Type */}
                <div className="flex items-center space-x-3">
                    {reward.icon && (
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
                            <img src={reward.icon} alt="" className="w-7 h-7" />
                        </div>
                    )}
                    <span className="text-[15px] font-bold tracking-tight drop-shadow-sm">
                        {reward.type}
                    </span>
                </div>

                {/* Bottom: Destination and Points */}
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold opacity-90 drop-shadow-md">
                            {reward.destCity ? 'Sydney to' : ''}
                        </span>
                        <span className="text-2xl font-black tracking-tight drop-shadow-lg leading-tight">
                            {reward.destCity || reward.reward}
                        </span>
                    </div>
                    <div className="flex items-baseline space-x-1.5 drop-shadow-lg">
                        <span className="text-2xl font-black uppercase tracking-tight">
                            {reward.pts.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold uppercase opacity-90">
                            PTS
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
