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
            // The WTESelection auto-picker will then kick in to show an example.
            updateSelectedRewardId(null, null, false);
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
