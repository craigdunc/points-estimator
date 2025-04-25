// long code - running

import React, { useState } from 'react';


// ─────────────────────────────────────────────
// Ways to Earn (WTE) – 21 entries, 5 tiers each
// ─────────────────────────────────────────────
const WTEs = [
  // ─── EVERYDAY ───
  { id: 1, name: 'Red Energy', icon: '⚡️', category: 'everyday', desc: 'Earn up to 15,000 bonus Qantas Points when you switch, then 2 points per A$1 on energy bills paid on time. Conditions apply.', tiers: [ { spend: 5000, pts: 7350 }, { spend: 7500, pts: 11000 }, { spend: 10000, pts: 14700 }, { spend: 15000, pts: 20000 }, { spend: 20000, pts: 26000 } ] },
  { id: 2, name: 'Everyday Rewards (Woolworths)', icon: '🛒', category: 'everyday', desc: 'Convert 2,000 Rewards points into 1,000 Qantas Points automatically at Woolworths, BIG W and BWS. Conditions apply.', tiers: [ { spend: 1000, pts: 2000 }, { spend: 2000, pts: 4000 }, { spend: 3000, pts: 8600 }, { spend: 5000, pts: 14000 }, { spend: 8000, pts: 22000 } ] },
  { id: 3, name: 'No Annual Fee Credit Card', icon: '💳', category: 'everyday', desc: 'Earn up to 8,000 bonus Qantas Points with no annual fee and collect points on everyday spend. Conditions apply.', tiers: [ { spend: 500, pts: 750 }, { spend: 1000, pts: 1125 }, { spend: 1500, pts: 1500 }, { spend: 2000, pts: 1875 }, { spend: 2500, pts: 2250 } ] },
  { id: 4, name: 'BP Rewards', icon: '⛽️', category: 'everyday', desc: 'Swipe at bp to earn up to 2 points per litre on Ultimate 98 and 1 point per A$1 in‑store. Conditions apply.', tiers: [ { spend: 500, pts: 700 }, { spend: 1000, pts: 1050 }, { spend: 1500, pts: 1400 }, { spend: 2000, pts: 1750 }, { spend: 2500, pts: 2100 } ] },
  { id: 5, name: 'Qantas Wellbeing', icon: '❤️', category: 'everyday', desc: 'Earn up to 1,000 bonus points in 28 days, then daily points for steps, sleep and wellness challenges. Conditions apply.', tiers: [ { spend: 300, pts: 450 }, { spend: 600, pts: 675 }, { spend: 900, pts: 900 }, { spend: 1200, pts: 1125 }, { spend: 1500, pts: 1350 } ] },
  { id: 6, name: 'Qantas Pay', icon: '💰', category: 'everyday', desc: 'Earn 1.5 points per A$1 spent overseas and 1 point per A$4 in Australia with Qantas Pay. Conditions apply.', tiers: [ { spend: 200, pts: 250 }, { spend: 400, pts: 375 }, { spend: 600, pts: 500 }, { spend: 800, pts: 625 }, { spend: 1000, pts: 750 } ] },
  { id: 7, name: 'Binge', icon: '📺', category: 'everyday', desc: 'Score 1,000 bonus points when you join Binge, plus 50 points every month you stay subscribed. Conditions apply.', tiers: [ { spend: 100, pts: 150 }, { spend: 200, pts: 225 }, { spend: 300, pts: 300 }, { spend: 400, pts: 375 }, { spend: 500, pts: 450 } ] },

  // ─── BIG POINT OFFERS ───
  { id: 12, name: 'Points Earning Credit Card', icon: '💳', category: 'big', desc: 'Collect up to 120,000 bonus points on signup and earn up to 1.25 points per A$1 on eligible spend. Conditions apply.', tiers: [ { spend: 0, pts: 50000 }, { spend: 0, pts: 75000 }, { spend: 0, pts: 125000 }, { spend: 0, pts: 150000 }, { spend: 0, pts: 200000 } ] },
  { id: 13, name: 'Qantas Home Loan', icon: '🏠', category: 'big', desc: 'Receive 100,000 – 150,000 Qantas Points every year with an eligible Qantas Money Home Loan. Conditions apply.', tiers: [ { spend: 0, pts: 50000 }, { spend: 0, pts: 75000 }, { spend: 0, pts: 100000 }, { spend: 0, pts: 150000 }, { spend: 0, pts: 200000 } ] },
  { id: 14, name: 'Qantas Car Insurance', icon: '🚗', category: 'big', desc: 'Earn up to 40,000 bonus points on a new car policy and 1 point per A$1 on premiums. Conditions apply.', tiers: [ { spend: 0, pts: 6000 }, { spend: 0, pts: 12000 }, { spend: 0, pts: 24000 }, { spend: 0, pts: 36000 }, { spend: 0, pts: 48000 } ] },
  { id: 15, name: 'Qantas Home Insurance', icon: '🏡', category: 'big', desc: 'Earn up to 40,000 bonus points on home & contents cover and 1 point per A$1 on premiums. Conditions apply.', tiers: [ { spend: 0, pts: 5000 }, { spend: 0, pts: 10000 }, { spend: 0, pts: 20000 }, { spend: 0, pts: 30000 }, { spend: 0, pts: 40000 } ] },
  { id: 16, name: 'Qantas Wine', icon: '🍷', category: 'big', desc: 'Earn at least 1 point per A$1 and up to 10,000 bonus points on selected cases at Qantas Wine. Conditions apply.', tiers: [ { spend: 500, pts: 3000 }, { spend: 1000, pts: 6000 }, { spend: 2000, pts: 12000 }, { spend: 3000, pts: 18000 }, { spend: 4000, pts: 24000 } ] },
  { id: 17, name: 'Qantas Health Insurance', icon: '❤️‍🩹', category: 'big', desc: 'Join Qantas Health Insurance for up to 130,000 bonus points and 1 point per A$1 on premiums. Conditions apply.', tiers: [ { spend: 500, pts: 3000 }, { spend: 1000, pts: 6000 }, { spend: 2000, pts: 12000 }, { spend: 3000, pts: 18000 }, { spend: 4000, pts: 24000 } ] },

  // ─── SHOP ───
  { id: 18, name: 'Everyday Rewards (Shop)', icon: '🛒', category: 'shop', desc: 'Every 2,000 Rewards points becomes 1,000 Qantas Points when you opt‑in. Conditions apply.', tiers: [ { spend: 1000, pts: 2000 }, { spend: 2000, pts: 4000 }, { spend: 3000, pts: 8600 }, { spend: 5000, pts: 14000 }, { spend: 8000, pts: 22000 } ] },
  { id: 19, name: 'Qantas Marketplace', icon: '🛍️', category: 'shop', desc: 'Shop 30,000+ products and earn up to 5 points per A$1 at Qantas Marketplace. Conditions apply.', tiers: [ { spend: 500, pts: 1500 }, { spend: 1000, pts: 2500 }, { spend: 2000, pts: 3500 }, { spend: 3000, pts: 4500 }, { spend: 4000, pts: 5500 } ] },
  { id: 20, name: 'Shopping Online Mall', icon: '🔍', category: 'shop', desc: 'Start via Qantas Shopping and earn up to 10 points per A$1 at 450+ retailers. Conditions apply.', tiers: [ { spend: 500, pts: 850 }, { spend: 1000, pts: 1250 }, { spend: 2000, pts: 1700 }, { spend: 3000, pts: 2550 }, { spend: 4000, pts: 3400 } ] },
  { id: 21, name: 'Direct Link Partners', icon: '🔗', category: 'shop', desc: 'Link partner accounts once and earn points automatically on qualifying transactions. Conditions apply.', tiers: [ { spend: 500, pts: 850 }, { spend: 1000, pts: 1250 }, { spend: 2000, pts: 1700 }, { spend: 3000, pts: 2550 }, { spend: 4000, pts: 3400 } ] }
];



// ─────────────────────────────────────────────
// Reward definitions (2 examples each)
// ─────────────────────────────────────────────
const flightsList = [
  { id: 1, reward: 'Sydney to London', pts: 55200, costAUD: 326.89 },
  { id: 2, reward: 'Sydney to Tokyo', pts: 31500, costAUD: 166.89 },
  { id: 3, reward: 'Sydney to Seoul', pts: 26000, costAUD: 166.89 },
  { id: 4, reward: 'Sydney to Honolulu', pts: 26000, costAUD: 221.09 },
  { id: 5, reward: 'Sydney to Manila', pts: 25200, costAUD: 156.89 },
  { id: 6, reward: 'Sydney to Hong Kong', pts: 25200, costAUD: 156.89 },
  { id: 7, reward: 'Sydney to Bangkok', pts: 25200, costAUD: 159.29 },
  { id: 8, reward: 'Sydney to Singapore', pts: 25200, costAUD: 156.89 },
  { id: 9, reward: 'Sydney to Jakarta', pts: 20300, costAUD: 146.89 },
  { id: 10, reward: 'Sydney to Christchurch', pts: 18000, costAUD: 173.69 },
  { id: 11, reward: 'Sydney to Wellington', pts: 18000, costAUD: 190.09 },
  { id: 12, reward: 'Sydney to Nadi', pts: 14400, costAUD: 125.89 },
  { id: 13, reward: 'Sydney to Queenstown', pts: 14400, costAUD: 178.89 },
  { id: 14, reward: 'Sydney to Hobart', pts: 9600, costAUD: 38.68 },
  { id: 15, reward: 'Sydney to Canberra', pts: 8000, costAUD: 77.04 },
  { id: 16, reward: 'Sydney to Brisbane', pts: 6400, costAUD: 38.89 },
  { id: 17, reward: 'Sydney to Melbourne', pts: 6400, costAUD: 34.09 },
  { id: 99, reward: 'Points Plus Pay', pts: 5000, costAUD: 95.00 }
];
const hotelsList = [
  { id: 1, reward: 'Ritz Carlton Melbourne', pts: 89987 },
  { id: 2, reward: 'Intercontinental Sorrento', pts: 69172 },
  { id: 3, reward: 'Parkroyal Melbourne Airport', pts: 54523 },
  { id: 4, reward: 'Lancemore Lindenderry Red Hill', pts: 44000 },
  { id: 5, reward: 'Quest East Melbourne', pts: 35804 },
  { id: 6, reward: 'Best Western Plus Travel Inn', pts: 26490 },
  { id: 7, reward: 'Lancemore rossley St. Melbourne', pts: 20000 },
  { id: 8, reward: 'Oaks Melbourne on Crossley', pts: 16000 }
];
const activitiesList = [
  { id: 1, reward: 'Private Yarra Valley Getaway', pts: 473280 },
  { id: 2, reward: '12 Apostles Helicopter Tour', pts: 197940 },
  { id: 3, reward: 'Phillip Island Penguins Private Tour', pts: 146940 },
  { id: 4, reward: 'Private Grampian National Park Tours', pts: 99000 },
  { id: 5, reward: 'Helicopter Winery Lunch', pts: 77940 },
  { id: 6, reward: 'Classic Chevy Road Tour', pts: 60000 },
  { id: 7, reward: '2-Day Yarra Valley Wine Tour', pts: 39000 },
  { id: 8, reward: 'Melbourne Premium Balloon Tour', pts: 29880 }
];
const marketplaceList = [
  { id: 1, reward: 'KitchenAid Artisan Stand Mixer', pts: 209800 },
  { id: 2, reward: 'Samsung 65‑inch 4K Smart TV', pts: 174500 },
  { id: 3, reward: 'Dyson Supersonic Hair Dryer', pts: 119800 },
  { id: 4, reward: 'oomba Combo Essential Robot', pts: 94800 },
  { id: 5, reward: 'Ultimate Ears Bluetooth Speaker ', pts: 69860 },
  { id: 6, reward: 'Tefal 5 Piece Cookware Set', pts: 59800 },
  { id: 7, reward: 'Bose QuietComfort Headphones', pts: 52700 },
  { id: 8, reward: 'Breville Essenza Coffee Machine', pts: 43800 },
  { id: 9, reward: 'Ninja Foodi Airfryer Max', pts: 39800 },
  { id: 10, reward: 'Samsonite 55cm Suitcase', pts: 32800 },
  { id: 11, reward: 'Royal Comfort Towel Set', pts: 21800 },
  { id: 12, reward: 'Wallabies Jersey - Womens', pts: 12960 },
  { id: 13, reward: 'Apple Airtag', pts: 9800 },
  { id: 14, reward: 'Qantas Luggage Tag', pts: 4000 },
  { id: 15, reward: 'Qantas Model Aeroplane', pts: 2400 }
];
const giftCardsList = [
  { id: 1, reward: 'Myer Gift Card - $1000', pts: 207250 },
  { id: 2, reward: 'Digital Mastercard - $500', pts: 121850 },
  { id: 3, reward: 'Airbnb Gift Card - $500', pts: 105650 },
  { id: 4, reward: 'Amazon Gift Card - $250', pts: 54450 },
  { id: 5, reward: 'JB Hifi Gift Card - $250', pts: 51850 },
  { id: 6, reward: 'Green Card - $100', pts: 44610 },
  { id: 7, reward: 'Red Balloon Gift Voucher', pts: 20000 },
  { id: 8, reward: 'Bunnings Gift Card - $50', pts: 11690 },
  { id: 9, reward: 'Everyday Wish Gift Card - $25', pts: 5500 },
  { id: 10, reward: 'Hoyts Gift Card - $20', pts: 4400 }
];
const entertainmentList = [
  { id: 1, reward: 'Keith Urban Tour VIP Ticket', pts: 150000 },
  { id: 2, reward: 'NRL Grand Final Premium Seat', pts: 133333 },
  { id: 3, reward: 'Melbourne Cup Package', pts: 116667 },
  { id: 4, reward: 'Back to the Future Musical Ticket', pts: 100000 },
  { id: 5, reward: 'Cirque du Soleil Premium Ticket', pts: 60000 },
  { id: 6, reward: 'MJ: The Musical Ticket', pts: 33333 },
  { id: 7, reward: 'Big Bash League T20 Ticket', pts: 10000 },
  { id: 8, reward: 'Royal Easter Show Entry', pts: 7500 },
  { id: 8, reward: 'A-League Soccer Match Ticket', pts: 4167 }
];

export default function PointsEstimator() {
  const [activeCategory, setActiveCategory] = useState('everyday');
  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [spendById, setSpendById] = useState(
    WTEs.reduce((acc, w) => ({ ...acc, [w.id]: w.tiers[2].spend }), {})
  );
  const [activeRewardTab, setActiveRewardTab] = useState('Flights');

  const getTier = w => w.tiers.find(t => t.spend === spendById[w.id]) || w.tiers[2];
  const pointsFor = w => getTier(w).pts;
  const totalPts = selectedIds.reduce(
    (sum, id) => sum + pointsFor(WTEs.find(w => w.id === id)), 0
  );

  const rewardTabs = ['Flights','Hotels','Activities','Marketplace','Gift Cards','Entertainment'];
  const rewardsMap = {
    Flights: flightsList,
    Hotels: hotelsList,
    Activities: activitiesList,
    Marketplace: marketplaceList,
    'Gift Cards': giftCardsList,
    Entertainment: entertainmentList
  };
  const currentRewards = rewardsMap[activeRewardTab] || [];
  const availableRewards = currentRewards.filter(r => r.pts <= totalPts);

  const toggleSelect = id => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleExpand = id => setExpandedId(prev => prev === id ? null : id);

  return (
//    <div className="max-w-md mx-auto p-4 pb-32">
   <div className="max-w-md mx-auto p-4">
      {/* Intro */}
      <div className="mb-4 text-gray-700">Select ways of earning Qantas Points to add to your dashboard. You can change your selection at any time.</div>
      {/* WTE Category Tabs */}
      <div className="flex space-x-6 border-b pb-2 mb-4 text-lg font-medium">
        {['everyday','big','shop'].map(cat => (
          <button key={cat} onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
            className={`cursor-pointer pb-1 ${activeCategory===cat ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* WTE List */}
      <div className="space-y-3">
        {WTEs.filter(w => w.category === activeCategory).map(w => {
          const tier = getTier(w);
          return (
            <div key={w.id} className="border rounded">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={selectedIds.includes(w.id)} onChange={() => toggleSelect(w.id)} style={{accentColor:'#dc2626'}}/>
                  <span className="text-xl">{w.icon}</span>
                  <div>
                    <div className="font-semibold">{w.name}</div>
                    <div className="text-sm text-gray-600">Est {tier.pts.toLocaleString()} pts/yr</div>
                  </div>
                </div>
                <button onClick={() => toggleExpand(w.id)} className="text-xl focus:outline-none">
                  {expandedId === w.id ? '▲' : '▼'}
                </button>
              </div>
              {expandedId === w.id && (
                <div className="px-12 pb-4">
                  <div className="mb-1 text-sm text-gray-600">{w.desc}</div>
                  <div className="mb-1 text-sm text-gray-600">Approx. ${tier.spend.toLocaleString()} spend/yr</div>
                  <input type="range" min={w.tiers[0].spend} max={w.tiers[4].spend} step={w.tiers[1].spend - w.tiers[0].spend}
                    value={spendById[w.id]} className="w-full" style={{accentColor:'#dc2626'}}
                    onChange={e => {
                      const val = Number(e.target.value);
                      setSpendById(p => ({ ...p, [w.id]: val }));
                      if (!selectedIds.includes(w.id)) toggleSelect(w.id);
                    }}/>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Footer */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Est {totalPts.toLocaleString()} PTS/yr</div>
            <div className="flex space-x-4 overflow-x-auto">
              {rewardTabs.map(tab => (
                <button key={tab} onClick={() => setActiveRewardTab(tab)}
                  className={`text-sm whitespace-nowrap ${activeRewardTab===tab ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-3">
            {availableRewards.map(r => (
              <div key={r.id} className="min-w-[180px] border rounded p-2">
                <div className="font-medium text-sm mb-1">{r.reward}</div>
                <div className="text-xs text-gray-600">
                  {r.costAUD ? `Use ${r.pts.toLocaleString()} PTS + $${r.costAUD.toFixed(2)}` : `${r.pts.toLocaleString()} PTS`}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 bg-red-600 text-white rounded">Add to Dashboard</button>
        </div>
      )}
    </div>
  );
}
