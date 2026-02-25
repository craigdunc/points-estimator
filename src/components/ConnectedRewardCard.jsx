import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import RewardCard from './RewardCard';
import CitySelectionModal from './CitySelectionModal';

/**
 * ConnectedRewardCard
 * 
 * A wrapper around RewardCard that handles:
 * 1. Fetching originCity from the store.
 * 2. Managing the CitySelectionModal state.
 * 3. Updating originCity in the store.
 * 
 * Usage: <ConnectedRewardCard reward={rewardObject} />
 */
export default function ConnectedRewardCard({ reward }) {
    const { current, updateOriginCity, updateSelectedRewardId } = useSaveSlots();
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);

    // Safely access originCity (default to Sydney if not set)
    const originCity = current?.originCity || 'Sydney';
    const isFavorited = current?.hasSelectedReward || false;

    if (!reward) return null;

    const handleFavoriteClick = () => {
        if (isFavorited) {
            // Un-favorite: Clear the explicit selection
            updateSelectedRewardId(null, null, false);
        } else {
            // Promote to favorite: Set this reward as explicit selection
            // We need to know the category. Reward object usually has it or we can pass it.
            // In most cases, reward objects from data.js have a type that maps to tabs, 
            // but let's assume we can get it from the reward object or just use the current tab.
            updateSelectedRewardId(reward.id, current?.selectedWTU, true);
        }
    };

    return (
        <>
            <RewardCard
                reward={reward}
                originCity={originCity}
                onOriginClick={() => setIsCityModalOpen(true)}
                isFavorited={isFavorited}
                onFavoriteClick={handleFavoriteClick}
            />

            <CitySelectionModal
                isOpen={isCityModalOpen}
                onClose={() => setIsCityModalOpen(false)}
                currentCity={originCity}
                onSelectCity={updateOriginCity}
            />
        </>
    );
}
