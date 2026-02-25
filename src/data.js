// src/data.js

// --- WTE logo imports ---
import RedEnergyLogo from './assets/logos/red-energy.svg';
import WoolworthsLogo from './assets/logos/everyday-rewards-woolworths.svg';
import NoFeeCardLogo from './assets/logos/no-annual-fee-card.svg';
import BpRewardsLogo from './assets/logos/bp-rewards.svg';
import QantasWellbeingLogo from './assets/logos/qantas-wellbeing.svg';
import QantasPayLogo from './assets/logos/qantas-pay.svg';
import BingeLogo from './assets/logos/binge.svg';
import PointsCardLogo from './assets/logos/points-earning-credit-card.svg';
import HomeLoanLogo from './assets/logos/qantas-home-loan.svg';
import CarInsuranceLogo from './assets/logos/qantas-car-insurance.svg';
import HomeInsuranceLogo from './assets/logos/qantas-home-insurance.svg';
import WineLogo from './assets/logos/qantas-wine.svg';
import HealthInsuranceLogo from './assets/logos/qantas-health-insurance.svg';
import EverydayShopLogo from './assets/logos/everyday-rewards-shop.svg';
import MarketplaceLogo from './assets/logos/qantas-marketplace.svg';
import OnlineMallLogo from './assets/logos/shopping-online-mall.svg';
import DirectLinkLogo from './assets/logos/direct-link-partners.svg';
import FlightsLogo from './assets/logos/flights.svg';
import HotelsLogo from './assets/logos/hotels.svg';
import ActivitiesLogo from './assets/logos/activities.svg';
import CarsLogo from './assets/logos/cars.svg';
import QantasPayTravelLogo from './assets/logos/qantas-pay-travel.svg';
import AccorLogo from './assets/logos/accor.svg';
import HolidaysLogo from './assets/logos/holidays.svg';
import TADLogo from './assets/logos/trip-a-deal.svg';
import CruisesLogo from './assets/logos/cruises.svg';

// --- Destination image imports ---
import AdelaideImg from './assets/images/rewards/adelaide.jpg';
import AucklandImg from './assets/images/rewards/auckland.jpg';
import BangkokImg from './assets/images/rewards/bangkok.jpg';
import BostonImg from './assets/images/rewards/boston.jpg';
import BrisbaneImg from './assets/images/rewards/brisbane.jpg';
import CairnsImg from './assets/images/rewards/cairns.jpg';
import CanberraImg from './assets/images/rewards/canberra.jpg';
import ChicagoImg from './assets/images/rewards/chicago.jpg';
import ChristchurchImg from './assets/images/rewards/christchurch.jpg';
import DallasImg from './assets/images/rewards/dallas.jpg';
import DarwinImg from './assets/images/rewards/darwin.jpg';
import DenpasarImg from './assets/images/rewards/denpasar.jpg';
import DubaiImg from './assets/images/rewards/dubai.jpg';
import GoldCoastImg from './assets/images/rewards/goldcoast.jpg';
import HobartImg from './assets/images/rewards/hobart.jpg';
import HongKongImg from './assets/images/rewards/hong-kong.jpg';
import HonoluluImg from './assets/images/rewards/honolulu.jpg';
import JakartaImg from './assets/images/rewards/jakarta.jpg';
import JohannesburgImg from './assets/images/rewards/johannesburg.jpg';
import KualaLumpurImg from './assets/images/rewards/kuala-lumpur.jpg';
import LAImg from './assets/images/rewards/la.jpg';
import LondonImg from './assets/images/rewards/london.jpg';
import MadridImg from './assets/images/rewards/madrid.jpg';
import ManilaImg from './assets/images/rewards/manila.jpg';
import MelbourneImg from './assets/images/rewards/melbourne.jpg';
import MiamiImg from './assets/images/rewards/miami.jpg';
import MumbaiImg from './assets/images/rewards/mumbai.jpg';
import NadiImg from './assets/images/rewards/nadi.jpg';
import NewYorkImg from './assets/images/rewards/new-york.jpg';
import ParisImg from './assets/images/rewards/paris.jpg';
import PerthImg from './assets/images/rewards/perth.jpg';
import QueenstownImg from './assets/images/rewards/queenstown.jpg';
import RioImg from './assets/images/rewards/rio.jpg';
import RomeImg from './assets/images/rewards/rome.jpg';
import SanFranciscoImg from './assets/images/rewards/san-francisco.jpg';
import SeattleImg from './assets/images/rewards/seattle.jpg';
import SeoulImg from './assets/images/rewards/seoul.jpg';
import ShanghaiImg from './assets/images/rewards/shanghai.jpg';
import SingaporeImg from './assets/images/rewards/singapore.jpg';
import TokyoImg from './assets/images/rewards/tokyo.jpg';
import VancouverImg from './assets/images/rewards/vancouver.jpg';
import WellingtonImg from './assets/images/rewards/welllington.jpg'; // Filename has typo

// --- Non-Flight Reward Imports ---
import HotelOaksImg from './assets/images/rewards/hotel-oaks-melbourne.jpg';
import HotelBestWesternImg from './assets/images/rewards/hotels-best-western.jpg';
import HotelLancemoreImg from './assets/images/rewards/hotels-lancermore-crossley-st.jpg';
import HotelQuestImg from './assets/images/rewards/hotel-quest-east-melbourne.jpg';
import ActivityBalloonImg from './assets/images/rewards/activities-melbourne-balloon-tour.jpg';
import MarketplaceAirtagImg from './assets/images/rewards/apple-airtag.jpg';
import MarketplaceLuggageTagImg from './assets/images/rewards/qantas-luggage-tag.jpg';
import MarketplaceModelPlaneImg from './assets/images/rewards/qantas-model-plane.jpg';
import MarketplaceTowelsImg from './assets/images/rewards/royal-comfort-towels.jpg';
import MarketplaceJerseyImg from './assets/images/rewards/rugby-jersey.jpg';
import GiftCardBunningsImg from './assets/images/rewards/gift-card-bunnings.jpg';
import GiftCardWishImg from './assets/images/rewards/gift-card-everyday-wish.jpg';
import GiftCardHoytsImg from './assets/images/rewards/gift-card-hoyts.jpg';
import GiftCardRedBalloonImg from './assets/images/rewards/gift-card-red-balloon.jpg';
import EntertALeagueImg from './assets/images/rewards/entertainment-a-league-soccer.jpg';
import EntertBigBashImg from './assets/images/rewards/entertainment-bigbash.jpg';
import EntertEasterShowImg from './assets/images/rewards/entertainment-royal-easter-show.jpg';


// --- Reward icon imports ---
import FlightRewardIcon from './assets/icons/flight-reward.svg';
import HotelRewardIcon from './assets/icons/hotel-reward.svg';
import ActivityRewardIcon from './assets/icons/activity-reward.svg';
import MarketplaceRewardIcon from './assets/icons/marketplace-reward.svg';
import GiftCardRewardIcon from './assets/icons/gift-card-reward.svg';
import EntertainmentRewardIcon from './assets/icons/entertainment-reward.svg';
import PointsPlusPayIcon from './assets/icons/points-plus-pay.svg';


export const SC_VALUES = [0, 300, 700, 1400, 3600];
export const SC_NAMES = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Platinum One'];

// ─────────────────────────────────────────────
// Ways to Earn (WTE) – 30 entries, 5 tiers each
// ─────────────────────────────────────────────
export const WTEs = [
  // ─── EVERYDAY (SHOP -> EVERYDAY SHOPPING / HOME UTILITIES) ───
  {
    id: 1,
    name: 'Red Energy',
    iconSrc: RedEnergyLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'utilities',
    desc: 'Earn up to 15,000 bonus Qantas Points when you switch, then 2 points per A$1 on energy bills paid on time. Conditions apply.',
    tiers: [
      { spend: 5000, pts: 7350 },
      { spend: 7500, pts: 11000 },
      { spend: 10000, pts: 14700 },
      { spend: 15000, pts: 20000 },
      { spend: 20000, pts: 26000 },
    ],
  },
  {
    id: 2,
    name: 'Everyday Rewards',
    iconSrc: WoolworthsLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'everyday',
    desc: 'Convert 2,000 Rewards points into 1,000 Qantas Points automatically at Woolworths, BIG W and BWS. Conditions apply.',
    tiers: [
      { spend: 1000, pts: 2000 },
      { spend: 2000, pts: 4000 },
      { spend: 3000, pts: 8600 },
      { spend: 5000, pts: 14000 },
      { spend: 8000, pts: 22000 },
    ],
  },
  {
    id: 3,
    name: 'No Annual Fee Credit Card',
    iconSrc: NoFeeCardLogo,
    category: 'banking',
    section: 'banking',
    subCategory: 'cards',
    desc: 'Earn up to 8,000 bonus Qantas Points with no annual fee and collect points on everyday spend. Conditions apply.',
    tiers: [
      { spend: 500, pts: 750 },
      { spend: 1000, pts: 1125 },
      { spend: 1500, pts: 1500 },
      { spend: 2000, pts: 1875 },
      { spend: 2500, pts: 2250 },
    ],
  },
  {
    id: 4,
    name: 'BP Rewards',
    iconSrc: BpRewardsLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'everyday',
    desc: 'Swipe at bp to earn up to 2 points per litre on Ultimate 98 and 1 point per A$1 in-store. Conditions apply.',
    tiers: [
      { spend: 500, pts: 700 },
      { spend: 1000, pts: 1050 },
      { spend: 1500, pts: 1400 },
      { spend: 2000, pts: 1750 },
      { spend: 2500, pts: 2100 },
    ],
  },
  {
    id: 5,
    name: 'Qantas Wellbeing',
    iconSrc: QantasWellbeingLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'everyday',
    desc: 'Earn up to 1,000 bonus points in 28 days, then daily points for steps, sleep and wellness challenges. Conditions apply.',
    tiers: [
      { spend: 300, pts: 450 },
      { spend: 600, pts: 675 },
      { spend: 900, pts: 900 },
      { spend: 1200, pts: 1125 },
      { spend: 1500, pts: 1350 },
    ],
  },
  {
    id: 6,
    name: 'Qantas Pay',
    iconSrc: QantasPayLogo,
    category: 'banking',
    section: 'banking',
    subCategory: 'cards',
    desc: 'Earn 1.5 points per A$1 spent overseas and 1 point per A$4 in Australia with Qantas Pay. Conditions apply.',
    tiers: [
      { spend: 200, pts: 250 },
      { spend: 400, pts: 375 },
      { spend: 600, pts: 500 },
      { spend: 800, pts: 625 },
      { spend: 1000, pts: 750 },
    ],
  },
  {
    id: 7,
    name: 'Binge',
    iconSrc: BingeLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'lifestyle',
    desc: 'Score 1,000 bonus points when you join Binge, plus 50 points every month you stay subscribed. Conditions apply.',
    tiers: [
      { spend: 100, pts: 150 },
      { spend: 200, pts: 225 },
      { spend: 300, pts: 300 },
      { spend: 400, pts: 375 },
      { spend: 500, pts: 450 },
    ],
  },
  // --- BIG POINTS EARNERS (BANKING -> CARDS / HOMELOANS / INSURANCE) ---
  {
    id: 12,
    name: 'Points Earning Credit Card',
    iconSrc: PointsCardLogo,
    category: 'banking',
    section: 'banking',
    subCategory: 'cards',
    desc: 'Collect up to 120,000 bonus points on signup and earn up to 1.25 points per A$1 on eligible spend. Conditions apply.',
    tiers: [
      { spend: 1000, pts: 50000 },
      { spend: 2500, pts: 75000 },
      { spend: 4000, pts: 125000 },
      { spend: 12000, pts: 150000 },
      { spend: 20000, pts: 200000 },
    ],
  },
  {
    id: 13,
    name: 'Qantas Home Loan',
    iconSrc: HomeLoanLogo,
    category: 'banking',
    section: 'banking',
    subCategory: 'homeloans',
    desc: 'Receive 100,000–150,000 Qantas Points every year with an eligible Qantas Money Home Loan. Conditions apply.',
    tiers: [
      { spend: 10000, pts: 50000 },
      { spend: 25000, pts: 75000 },
      { spend: 40000, pts: 100000 },
      { spend: 65000, pts: 150000 },
      { spend: 80000, pts: 200000 },
    ],
  },
  {
    id: 14,
    name: 'Qantas Car Insurance',
    iconSrc: CarInsuranceLogo,
    category: 'banking',
    section: 'banking',
    subCategory: 'insurance',
    desc: 'Earn up to 40,000 bonus points on a new car policy and 1 point per A$1 on premiums. Conditions apply.',
    tiers: [
      { spend: 200, pts: 6000 },
      { spend: 400, pts: 12000 },
      { spend: 800, pts: 24000 },
      { spend: 1600, pts: 36000 },
      { spend: 3000, pts: 48000 },
    ],
  },
  {
    id: 15,
    name: 'Qantas Home Insurance',
    iconSrc: HomeInsuranceLogo,
    category: 'banking',
    section: 'banking',
    subCategory: 'insurance',
    desc: 'Earn up to 40,000 bonus points on home & contents cover and 1 point per A$1 on premiums. Conditions apply.',
    tiers: [
      { spend: 500, pts: 5000 },
      { spend: 750, pts: 10000 },
      { spend: 1000, pts: 20000 },
      { spend: 1200, pts: 30000 },
      { spend: 2500, pts: 40000 },
    ],
  },
  {
    id: 16,
    name: 'Qantas Wine',
    iconSrc: WineLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'lifestyle',
    desc: 'Earn at least 1 point per A$1 and up to 10,000 bonus points on selected cases at Qantas Wine. Conditions apply.',
    tiers: [
      { spend: 500, pts: 3000 },
      { spend: 1000, pts: 6000 },
      { spend: 2000, pts: 12000 },
      { spend: 3000, pts: 18000 },
      { spend: 4000, pts: 24000 },
    ],
  },
  {
    id: 17,
    name: 'Qantas Health Insurance',
    iconSrc: HealthInsuranceLogo,
    category: 'banking',
    section: 'banking',
    subCategory: 'insurance',
    desc: 'Join Qantas Health Insurance for up to 130,000 bonus points and 1 point per A$1 on premiums. Conditions apply.',
    tiers: [
      { spend: 500, pts: 3000 },
      { spend: 1000, pts: 6000 },
      { spend: 2000, pts: 12000 },
      { spend: 3000, pts: 18000 },
      { spend: 4000, pts: 24000 },
    ],
  },


  // --- SHOP entries (SHOP -> EVERYDAY SHOPPING / LIFESTYLE) ---

  {
    id: 19,
    name: 'Qantas Marketplace',
    iconSrc: MarketplaceLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'lifestyle',
    desc: 'Shop 30,000+ products and earn up to 5 points per A$1 at Qantas Marketplace. Conditions apply.',
    tiers: [
      { spend: 500, pts: 1500 },
      { spend: 1000, pts: 2500 },
      { spend: 2000, pts: 3500 },
      { spend: 3000, pts: 4500 },
      { spend: 4000, pts: 5500 },
    ],
  },
  {
    id: 20,
    name: 'Shopping Online Mall',
    iconSrc: OnlineMallLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'lifestyle',
    desc: 'Start via Qantas Shopping and earn up to 10 points per A$1 at 450+ retailers. Conditions apply.',
    tiers: [
      { spend: 500, pts: 850 },
      { spend: 1000, pts: 1250 },
      { spend: 2000, pts: 1700 },
      { spend: 3000, pts: 2550 },
      { spend: 4000, pts: 3400 },
    ],
  },
  {
    id: 21,
    name: 'Direct Link Partners',
    iconSrc: DirectLinkLogo,
    category: 'shop',
    section: 'shop',
    subCategory: 'lifestyle',
    desc: 'Link partner accounts once and earn points automatically on qualifying transactions. Conditions apply.',
    tiers: [
      { spend: 500, pts: 850 },
      { spend: 1000, pts: 1250 },
      { spend: 2000, pts: 1700 },
      { spend: 3000, pts: 2550 },
      { spend: 4000, pts: 3400 },
    ],
  },
  // --- TRAVEL entries (TRAVEL -> FLIGHTS / HOTELS / HOLIDAYS / GROUND) ---
  {
    id: 22,
    name: 'Qantas & Partner Flights',
    iconSrc: FlightsLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'flights',
    desc: 'Earn points on every eligible flight with Qantas, Jetstar, over 30 oneworld® member and partner airlines.',
    tiers: [
      { spend: 300, pts: 1200 },
      { spend: 1000, pts: 4000 },
      { spend: 2500, pts: 10000 },
      { spend: 5000, pts: 20000 },
      { spend: 10000, pts: 40000 },
    ],
  },
  {
    id: 23,
    name: 'Qantas Hotels',
    iconSrc: HotelsLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'hotels',
    desc: 'Book hotels and accommodation via Qantas Hotels and earn 3 Qantas Points per A$1 spent on eligible stays. Conditions apply.',
    tiers: [
      { spend: 300, pts: 900 },
      { spend: 800, pts: 2400 },
      { spend: 1500, pts: 4500 },
      { spend: 2500, pts: 7500 },
      { spend: 4000, pts: 12000 },
    ],
  },
  {
    id: 24,
    name: 'Qantas Activities',
    iconSrc: ActivitiesLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'holidays',
    desc: 'Earn 1 point per A$1 spent on tours, activities and expariences, powered by Viator. Conditions apply.',
    tiers: [
      { spend: 100, pts: 100 },
      { spend: 300, pts: 300 },
      { spend: 600, pts: 600 },
      { spend: 1000, pts: 1000 },
      { spend: 2000, pts: 2000 },
    ],
  },
  {
    id: 25,
    name: 'Qantas Cars',
    iconSrc: CarsLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'ground',
    desc: 'Earn 4 Qantas Points per A$1 on the rate for Avis and Budget rentals, plus 700 points overseas. Conditions apply.',
    tiers: [
      { spend: 150, pts: 600 },
      { spend: 400, pts: 1600 },
      { spend: 800, pts: 3200 },
      { spend: 1200, pts: 4800 },
      { spend: 2000, pts: 8000 },
    ],
  },

  {
    id: 26,
    name: 'Qantas Pay (Travel Money)',
    iconSrc: QantasPayTravelLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'ground',
    desc: 'Earn 1 Qantas Point per A$1 loaded with Qantas Pay, and 1 Point per A$1 spent overseas. Conditions apply.',
    tiers: [
      { spend: 500, pts: 750 },
      { spend: 2000, pts: 3000 },
      { spend: 5000, pts: 7500 },
      { spend: 8000, pts: 12000 },
      { spend: 12000, pts: 18000 },
    ],
  },

  {
    id: 27,
    name: 'Accor Live Limitless',
    iconSrc: AccorLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'hotels',
    desc: 'Earn bonus Qantas Points on direct hotel spend. Earn both Qantas and ALL Reward points. Conditions apply.',
    tiers: [
      { spend: 250, pts: 750 },
      { spend: 600, pts: 1800 },
      { spend: 1200, pts: 3600 },
      { spend: 2500, pts: 7500 },
      { spend: 4000, pts: 12000 },
    ],
  },
  {
    id: 28,
    name: 'Qantas Holidays',
    iconSrc: HolidaysLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'holidays',
    desc: 'Earn 3 Qantas Points per A$1 spent on eligible holiday packages. Conditions apply.',
    tiers: [
      { spend: 500, pts: 1500 },
      { spend: 2000, pts: 6000 },
      { spend: 5000, pts: 15000 },
      { spend: 8000, pts: 24000 },
      { spend: 12000, pts: 36000 },
    ],
  },
  {
    id: 29,
    name: 'Trip-A-Deal',
    iconSrc: TADLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'holidays',
    desc: 'Earn 3 Qantas Points per A$1 spent on eligible Trip-A-Deal holiday packages. Conditions apply.',
    tiers: [
      { spend: 500, pts: 1500 },
      { spend: 2000, pts: 6000 },
      { spend: 5000, pts: 15000 },
      { spend: 8000, pts: 24000 },
      { spend: 12000, pts: 36000 },
    ],
  },

  {
    id: 30,
    name: 'Qantas Cruises',
    iconSrc: CruisesLogo,
    category: 'travel',
    section: 'travel',
    subCategory: 'holidays',
    desc: 'Earn 1 point per A$1 spent on your cruise. Qantas partners with the Award-winning Cruise Guru. Conditions apply.',
    tiers: [
      { spend: 1000, pts: 1000 },
      { spend: 2000, pts: 2000 },
      { spend: 5000, pts: 5000 },
      { spend: 3000, pts: 3000 },
      { spend: 36000, pts: 36000 },
    ],
  },
];

export const WTE_HIERARCHY = [
  {
    id: 'travel',
    label: 'Travel',
    categories: [
      { id: 'flights', label: 'FLIGHTS', iconType: 'leisure' },
      { id: 'holidays', label: 'HOLIDAYS, ACTIVITIES & EXPERIENCES', iconType: 'leisure' },
      { id: 'hotels', label: 'HOTELS & ACCOMMODATION', iconType: 'building' },
      { id: 'ground', label: 'GROUND TRANSPORTATION', iconType: 'leisure' },
    ]
  },
  {
    id: 'shop',
    label: 'Shop',
    categories: [
      { id: 'everyday', label: 'EVERYDAY SHOPPING', iconType: 'leisure' },
      { id: 'lifestyle', label: 'LIFESTYLE RETAIL & ENTERTAINMENT', iconType: 'building' },
      { id: 'utilities', label: 'Home Utilities', iconType: 'leisure' },
    ]
  },
  {
    id: 'banking',
    label: 'Banking & Insurance',
    categories: [
      { id: 'cards', label: 'CARDS & BANKING', iconType: 'leisure' },
      { id: 'homeloans', label: 'BANKING & HOMELOANS', iconType: 'leisure' },
      { id: 'insurance', label: 'INSURANCE', iconType: 'building' },
    ]
  }
];

export const calculateGroundSC = (selectedWTEs) => {
  if (!selectedWTEs) return 0;
  let total = 0;
  WTE_HIERARCHY.forEach(section => {
    section.categories.forEach(subCat => {
      if (subCat.id === 'flights') return;
      const items = WTEs.filter(w => w.subCategory === subCat.id);
      const categoryPts = items.reduce((sum, w) => {
        const sel = selectedWTEs.find(s => s.id === w.id);
        if (sel) {
          const tierIdx = parseInt(sel.level, 10);
          return sum + (w.tiers[tierIdx]?.pts || 0);
        }
        return sum;
      }, 0);
      if (categoryPts >= 1000) {
        const scAmount = ['utilities', 'cards', 'homeloans', 'insurance'].includes(subCat.id) ? 20 : 10;
        total += scAmount;
      }
    });
  });
  return total;
};

// ─────────────────────────────────────────────
// Reward definitions
// ─────────────────────────────────────────────

// Define Origin (Sydney for now)
export const ORIGIN_CITY = {
  name: 'Sydney',
  coords: { lat: -33.9461, lon: 151.1772 } // SYD Airport approx. coords
};

// Map cities to their local imported images
const localRewardImages = {
  'Adelaide': AdelaideImg,
  'Auckland': AucklandImg,
  'Bangkok': BangkokImg,
  'Boston': BostonImg,
  'Brisbane': BrisbaneImg,
  'Cairns': CairnsImg,
  'Canberra': CanberraImg,
  'Chicago': ChicagoImg,
  'Christchurch': ChristchurchImg,
  'Dallas': DallasImg,
  'Darwin': DarwinImg,
  'Denpasar': DenpasarImg,
  'Dubai': DubaiImg,
  'Gold Coast': GoldCoastImg,
  'Hobart': HobartImg,
  'Hong Kong': HongKongImg,
  'Honolulu': HonoluluImg,
  'Jakarta': JakartaImg,
  'Johannesburg': JohannesburgImg,
  'Kuala Lumpur': KualaLumpurImg,
  'Los Angeles': LAImg,
  'London': LondonImg,
  'Madrid': MadridImg,
  'Manila': ManilaImg,
  'Melbourne': MelbourneImg,
  'Miami': MiamiImg,
  'Mumbai': MumbaiImg,
  'Nadi': NadiImg,
  'New York': NewYorkImg,
  'Paris': ParisImg,
  'Perth': PerthImg,
  'Queenstown': QueenstownImg,
  'Rio de Janeiro': RioImg,
  'Rome': RomeImg,
  'San Francisco': SanFranciscoImg,
  'Seattle': SeattleImg,
  'Seoul': SeoulImg,
  'Shanghai': ShanghaiImg,
  'Singapore': SingaporeImg,
  'Tokyo': TokyoImg,
  'Vancouver': VancouverImg,
  'Wellington': WellingtonImg,

  // Hotels
  'Best Western Plus Travel Inn': HotelBestWesternImg,
  'Lancemore Crossley St. Melbourne': HotelLancemoreImg,
  'Oaks Melbourne on Collins': HotelOaksImg,
  'Quest East Melbourne': HotelQuestImg,

  // Activities
  'Balloon Tour': ActivityBalloonImg,

  // Marketplace
  'Apple Airtag': MarketplaceAirtagImg,
  'Luggage Tag': MarketplaceLuggageTagImg,
  'Model Aeroplane': MarketplaceModelPlaneImg,
  'Towel Set': MarketplaceTowelsImg,
  'Wallabies Jersey': MarketplaceJerseyImg,

  // Gift Cards
  'Bunnings': GiftCardBunningsImg,
  'Wish Card': GiftCardWishImg,
  'Hoyts Card': GiftCardHoytsImg,
  'Red Balloon': GiftCardRedBalloonImg,

  // Entertainment
  'A-League Ticket': EntertALeagueImg,
  'BBL Ticket': EntertBigBashImg,
  'Easter Show': EntertEasterShowImg,
};

// Helper to get image URL (uses local images where available, else placeholder)
const getImg = city => {
  if (localRewardImages[city]) {
    return localRewardImages[city];
  }
  return `https://placehold.co/600x400?text=${encodeURIComponent(city)}`;
};

// UPDATED flightsList with destCity and destCoords
export const flightsList = [
  // 55,200 pts
  { id: 1, type: 'Classic Flight Reward', reward: 'Sydney to London', destCity: 'London', destCoords: { lat: 51.4700, lon: -0.4543 }, pts: 55200, costAUD: 326.89, imageUrl: getImg('London') },
  { id: 2, type: 'Classic Flight Reward', reward: 'Sydney to New York', destCity: 'New York', destCoords: { lat: 40.6413, lon: -73.7781 }, pts: 55200, costAUD: 320.00, imageUrl: getImg('New York') },
  { id: 3, type: 'Classic Flight Reward', reward: 'Sydney to Paris', destCity: 'Paris', destCoords: { lat: 49.0097, lon: 2.5479 }, pts: 55200, costAUD: 260.00, imageUrl: getImg('Paris') },
  { id: 4, type: 'Classic Flight Reward', reward: 'Sydney to Madrid', destCity: 'Madrid', destCoords: { lat: 40.4983, lon: -3.5676 }, pts: 55200, costAUD: 265.00, imageUrl: getImg('Madrid') },
  { id: 5, type: 'Classic Flight Reward', reward: 'Sydney to Rome', destCity: 'Rome', destCoords: { lat: 41.7994, lon: 12.2453 }, pts: 55200, costAUD: 255.00, imageUrl: getImg('Rome') },
  { id: 6, type: 'Classic Flight Reward', reward: 'Sydney to Boston', destCity: 'Boston', destCoords: { lat: 42.3656, lon: -71.0096 }, pts: 55200, costAUD: 330.00, imageUrl: getImg('Boston') },

  // 51,200 pts
  { id: 7, type: 'Classic Flight Reward', reward: 'Sydney to Vancouver', destCity: 'Vancouver', destCoords: { lat: 49.1939, lon: -123.1830 }, pts: 51200, costAUD: 230.00, imageUrl: getImg('Vancouver') },
  { id: 8, type: 'Classic Flight Reward', reward: 'Sydney to Dallas', destCity: 'Dallas', destCoords: { lat: 32.8998, lon: -97.0403 }, pts: 51200, costAUD: 300.00, imageUrl: getImg('Dallas') },
  { id: 9, type: 'Classic Flight Reward', reward: 'Sydney to Miami', destCity: 'Miami', destCoords: { lat: 25.7959, lon: -80.2871 }, pts: 51200, costAUD: 300.00, imageUrl: getImg('Miami') },

  // 41,900 pts
  { id: 10, type: 'Classic Flight Reward', reward: 'Sydney to Los Angeles', destCity: 'Los Angeles', destCoords: { lat: 33.9416, lon: -118.4085 }, pts: 41900, costAUD: 209.00, imageUrl: getImg('Los Angeles') },
  { id: 11, type: 'Classic Flight Reward', reward: 'Sydney to San Francisco', destCity: 'San Francisco', destCoords: { lat: 37.7749, lon: -122.4194 }, pts: 41900, costAUD: 215.00, imageUrl: getImg('San Francisco') },
  { id: 12, type: 'Classic Flight Reward', reward: 'Sydney to Seattle', destCity: 'Seattle', destCoords: { lat: 47.4502, lon: -122.3088 }, pts: 41900, costAUD: 300.00, imageUrl: getImg('Seattle') },
  { id: 13, type: 'Classic Flight Reward', reward: 'Sydney to Rio de Janeiro', destCity: 'Rio de Janeiro', destCoords: { lat: -22.9105, lon: -43.1615 }, pts: 41900, costAUD: 260.00, imageUrl: getImg('Rio de Janeiro') },

  // 41,200 pts
  { id: 14, type: 'Classic Flight Reward', reward: 'Sydney to Dubai', destCity: 'Dubai', destCoords: { lat: 25.2532, lon: 55.3657 }, pts: 41200, costAUD: 220.00, imageUrl: getImg('Dubai') },

  // 37,600 pts
  { id: 15, type: 'Classic Flight Reward', reward: 'Sydney to Johannesburg', destCity: 'Johannesburg', destCoords: { lat: -26.1337, lon: 28.2420 }, pts: 37600, costAUD: 188.00, imageUrl: getImg('Johannesburg') },
  { id: 16, type: 'Classic Flight Reward', reward: 'Sydney to Chicago', destCity: 'Chicago', destCoords: { lat: 41.9742, lon: -87.9073 }, pts: 37600, costAUD: 260.00, imageUrl: getImg('Chicago') },

  // 31,500 pts
  { id: 17, type: 'Classic Flight Reward', reward: 'Sydney to Tokyo', destCity: 'Tokyo', destCoords: { lat: 35.5494, lon: 139.7798 }, pts: 31500, costAUD: 166.89, imageUrl: getImg('Tokyo') },
  { id: 18, type: 'Classic Flight Reward', reward: 'Sydney to Shanghai', destCity: 'Shanghai', destCoords: { lat: 31.1434, lon: 121.8050 }, pts: 31500, costAUD: 188.72, imageUrl: getImg('Shanghai') },
  { id: 19, type: 'Classic Flight Reward', reward: 'Sydney to Mumbai', destCity: 'Mumbai', destCoords: { lat: 19.0896, lon: 72.8656 }, pts: 31500, costAUD: 190.00, imageUrl: getImg('Mumbai') },

  // 26,000 pts
  { id: 20, type: 'Classic Flight Reward', reward: 'Sydney to Seoul', destCity: 'Seoul', destCoords: { lat: 37.4602, lon: 126.4407 }, pts: 26000, costAUD: 166.89, imageUrl: getImg('Seoul') },
  { id: 21, type: 'Classic Flight Reward', reward: 'Sydney to Honolulu', destCity: 'Honolulu', destCoords: { lat: 21.3187, lon: -157.9224 }, pts: 26000, costAUD: 221.09, imageUrl: getImg('Honolulu') },

  // 25,200 pts
  { id: 22, type: 'Classic Flight Reward', reward: 'Sydney to Manila', destCity: 'Manila', destCoords: { lat: 14.5086, lon: 121.0194 }, pts: 25200, costAUD: 156.89, imageUrl: getImg('Manila') },
  { id: 23, type: 'Classic Flight Reward', reward: 'Sydney to Hong Kong', destCity: 'Hong Kong', destCoords: { lat: 22.3080, lon: 113.9185 }, pts: 25200, costAUD: 156.89, imageUrl: getImg('Hong Kong') },
  { id: 24, type: 'Classic Flight Reward', reward: 'Sydney to Bangkok', destCity: 'Bangkok', destCoords: { lat: 13.6900, lon: 100.7501 }, pts: 25200, costAUD: 159.29, imageUrl: getImg('Bangkok') },
  { id: 25, type: 'Classic Flight Reward', reward: 'Sydney to Singapore', destCity: 'Singapore', destCoords: { lat: 1.3644, lon: 103.9915 }, pts: 25200, costAUD: 156.89, imageUrl: getImg('Singapore') },
  { id: 26, type: 'Classic Flight Reward', reward: 'Sydney to Denpasar', destCity: 'Denpasar', destCoords: { lat: -8.7480, lon: 115.1670 }, pts: 25200, costAUD: 175.00, imageUrl: getImg('Denpasar') },
  { id: 27, type: 'Classic Flight Reward', reward: 'Sydney to Kuala Lumpur', destCity: 'Kuala Lumpur', destCoords: { lat: 2.7456, lon: 101.7092 }, pts: 25200, costAUD: 180.00, imageUrl: getImg('Kuala Lumpur') },

  // 20,300 pts
  { id: 28, type: 'Classic Flight Reward', reward: 'Sydney to Jakarta', destCity: 'Jakarta', destCoords: { lat: -6.1256, lon: 106.6559 }, pts: 20300, costAUD: 146.89, imageUrl: getImg('Jakarta') },
  { id: 29, type: 'Classic Flight Reward', reward: 'Sydney to Perth', destCity: 'Perth', destCoords: { lat: -31.9403, lon: 115.9670 }, pts: 20300, costAUD: 150.00, imageUrl: getImg('Perth') },
  { id: 30, type: 'Classic Flight Reward', reward: 'Sydney to Darwin', destCity: 'Darwin', destCoords: { lat: -12.4153, lon: 130.8856 }, pts: 20300, costAUD: 50.00, imageUrl: getImg('Darwin') },

  // 18,000 pts
  { id: 31, type: 'Classic Flight Reward', reward: 'Sydney to Christchurch', destCity: 'Christchurch', destCoords: { lat: -43.4894, lon: 172.5322 }, pts: 18000, costAUD: 173.69, imageUrl: getImg('Christchurch') },
  { id: 32, type: 'Classic Flight Reward', reward: 'Sydney to Wellington', destCity: 'Wellington', destCoords: { lat: -41.3276, lon: 174.8078 }, pts: 18000, costAUD: 190.09, imageUrl: getImg('Wellington') },
  { id: 33, type: 'Classic Flight Reward', reward: 'Sydney to Auckland', destCity: 'Auckland', destCoords: { lat: -37.0082, lon: 174.7850 }, pts: 18000, costAUD: 132.18, imageUrl: getImg('Auckland') },
  { id: 34, type: 'Classic Flight Reward', reward: 'Sydney to Cairns', destCity: 'Cairns', destCoords: { lat: -16.8767, lon: 145.7541 }, pts: 18000, costAUD: 40.00, imageUrl: getImg('Cairns') },

  // 14,400 pts
  { id: 35, type: 'Classic Flight Reward', reward: 'Sydney to Nadi', destCity: 'Nadi', destCoords: { lat: -17.7550, lon: 177.4436 }, pts: 14400, costAUD: 125.89, imageUrl: getImg('Nadi') },
  { id: 36, type: 'Classic Flight Reward', reward: 'Sydney to Queenstown', destCity: 'Queenstown', destCoords: { lat: -45.0212, lon: 168.7392 }, pts: 14400, costAUD: 178.89, imageUrl: getImg('Queenstown') },

  // 12,000 pts
  { id: 37, type: 'Classic Flight Reward', reward: 'Sydney to Adelaide', destCity: 'Adelaide', destCoords: { lat: -34.9450, lon: 138.5306 }, pts: 12000, costAUD: 30.00, imageUrl: getImg('Adelaide') },

  // 9,600 pts
  { id: 38, type: 'Classic Flight Reward', reward: 'Sydney to Hobart', destCity: 'Hobart', destCoords: { lat: -42.8368, lon: 147.5082 }, pts: 9600, costAUD: 38.68, imageUrl: getImg('Hobart') },

  // 8,000 pts
  { id: 39, type: 'Classic Flight Reward', reward: 'Sydney to Canberra', destCity: 'Canberra', destCoords: { lat: -35.3069, lon: 149.1944 }, pts: 8000, costAUD: 77.04, imageUrl: getImg('Canberra') },
  { id: 40, type: 'Classic Flight Reward', reward: 'Sydney to Gold Coast', destCity: 'Gold Coast', destCoords: { lat: -28.1648, lon: 153.5050 }, pts: 8000, costAUD: 30.00, imageUrl: getImg('Gold Coast') },

  // 6,400 pts
  { id: 41, type: 'Classic Flight Reward', reward: 'Sydney to Brisbane', destCity: 'Brisbane', destCoords: { lat: -27.3842, lon: 153.1175 }, pts: 6400, costAUD: 38.89, imageUrl: getImg('Brisbane') },
  { id: 42, type: 'Classic Flight Reward', reward: 'Sydney to Melbourne', destCity: 'Melbourne', destCoords: { lat: -37.6690, lon: 144.8410 }, pts: 6400, costAUD: 34.09, imageUrl: getImg('Melbourne') }

];

export const hotelsList = [
  // Sydney
  { id: 1, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Sydney', reward: 'Four Seasons Hotel Sydney', propertyId: '128821', desc: 'Central luxury with dramatic views of Sydney Harbour, offering an outdoor pool, full-service spa, and acclaimed dining at Mode Kitchen & Bar.', pts: 89987, imageUrl: getImg('Four Seasons Sydney') },
  { id: 2, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Sydney', reward: 'QT Sydney', propertyId: '372910', desc: 'Set within the historic Gowings and State Theatre buildings. QT Sydney blends Gothic, Art Deco, and Italianate influences in the heart of the CBD.', pts: 69172, imageUrl: getImg('QT Sydney') },
  { id: 3, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Sydney', reward: 'The Fullerton Hotel Sydney', propertyId: '143229', desc: 'Located in the historic former General Post Office building. Enjoy modern luxury, exceptional dining, and proximity to Martin Place.', pts: 54523, imageUrl: getImg('The Fullerton Hotel Sydney') },
  // Melbourne
  { id: 4, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Melbourne', reward: 'Ritz Carlton Melbourne', propertyId: '982732', desc: 'Soaring above the CBD, offering breathtaking views, an infinity pool, luxury spa and distinctly Melbourne culinary experiences.', pts: 89987, imageUrl: getImg('Ritz Carlton Melbourne') },
  { id: 5, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Melbourne', reward: 'Intercontinental Sorrento', propertyId: '802143', desc: 'Seaside glamour on the Mornington Peninsula with a Mediterranean-style pool deck, Aurora Spa & Bathhouse, and distinct culinary venues.', pts: 69172, imageUrl: getImg('Intercontinental Sorrento') },
  { id: 6, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Melbourne', reward: 'Parkroyal Melbourne Airport', propertyId: '119283', desc: 'Connected directly to the airport terminals by an undercover walkway. Features a heated indoor pool, spa, and 24-hour fitness centre.', pts: 54523, imageUrl: getImg('Parkroyal Melbourne Airport') },
  { id: 7, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Melbourne', reward: 'Lancemore Lindenderry Red Hill', propertyId: '298112', desc: 'Set on 34 acres of gardens and vines. A classic country house hotel offering cellar door tastings and a hatted restaurant.', pts: 44000, imageUrl: getImg('Lancemore Lindenderry Red Hill') },
  // Brisbane
  { id: 8, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Brisbane', reward: 'The Calile Hotel', propertyId: '682121', desc: 'An urban resort in James Street, Fortitude Valley. Features a stunning pool deck, cabanas, and Hellenika restaurant.', pts: 72000, imageUrl: getImg('The Calile Hotel') },
  { id: 9, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Brisbane', reward: 'W Brisbane', propertyId: '772154', desc: 'Located on the edge of the Brisbane River, boasting stellar views, a vibrant WET Deck pool, and luxurious eclectic design.', pts: 65000, imageUrl: getImg('W Brisbane') },
  // Perth
  { id: 10, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Perth', reward: 'COMO The Treasury', propertyId: '492811', desc: 'A contemporary luxury hotel in a 19th-century state buildings complex. Renowned for spacious rooms and Wildflower, its rooftop restaurant.', pts: 82000, imageUrl: getImg('COMO The Treasury') },
  { id: 11, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Perth', reward: 'Crown Towers Perth', propertyId: '553821', desc: 'Experience unparalleled luxury with expansive lagoon pools, lavishly appointed rooms, and world-class dining at Crown Perth.', pts: 75000, imageUrl: getImg('Crown Towers Perth') },
  // Tokyo
  { id: 12, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Tokyo', reward: 'Aman Tokyo', propertyId: '882191', desc: 'Occupying the top six floors of the Otemachi Tower, Aman Tokyo offers a peaceful sanctuary with spectacular views, a ryokan-style spa, and serene design.', pts: 120000, imageUrl: getImg('Aman Tokyo') },
  { id: 13, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Tokyo', reward: 'Park Hyatt Tokyo', propertyId: '183922', desc: 'Famous for its role in "Lost in Translation", offering sweeping views of the city and Mount Fuji, an indoor pool, and the iconic New York Grill.', pts: 95000, imageUrl: getImg('Park Hyatt Tokyo') },
  // Bali
  { id: 14, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Bali', reward: 'The Mulia Bali', propertyId: '472881', desc: 'An ultra-luxurious, all-suite resort on the Nusa Dua coastline featuring exquisite oceanfront pools, personalized butler service and extensive dining.', pts: 60000, imageUrl: getImg('The Mulia Bali') },
  { id: 15, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Bali', reward: 'AYANA Resort', propertyId: '192833', desc: 'Perched on limestone cliffs above Jimbaran Bay. Known for breathtaking sunsets, an expansive spa, and the famous Rock Bar.', pts: 55000, imageUrl: getImg('AYANA Resort') },
  // Singapore
  { id: 16, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Singapore', reward: 'Raffles Singapore', propertyId: '102928', desc: 'The iconic 19th-century colonial hotel. A legendary oasis featuring lush green courtyards, period architecture, and the Long Bar.', pts: 110000, imageUrl: getImg('Raffles Singapore') },
  { id: 17, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'Singapore', reward: 'Marina Bay Sands', propertyId: '662912', desc: 'Singapore\'s landmark integrated resort, featuring the world\'s largest rooftop Infinity Pool, award-winning dining, and luxury shopping.', pts: 95000, imageUrl: getImg('Marina Bay Sands') },
  // London
  { id: 18, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'London', reward: 'The Savoy', propertyId: '112833', desc: 'Perfectly positioned on the River Thames. An iconic luxury hotel with Edwardian and Art Deco elegance, and the famous American Bar.', pts: 130000, imageUrl: getImg('The Savoy') },
  { id: 19, type: 'Qantas Hotel Reward', icon: HotelRewardIcon, city: 'London', reward: 'Shangri-La The Shard', propertyId: '571922', desc: 'Starting on the 34th floor of The Shard. Experience unmatched panoramic views of London, floor-to-ceiling windows, and the highest hotel pool in Western Europe.', pts: 115000, imageUrl: getImg('Shangri-La The Shard') }
];

export const activitiesList = [
  // Melbourne (Keep some original to keep it full)
  { id: 1, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Melbourne', reward: 'Private Yarra Valley Getaway', pts: 473280, imageUrl: getImg('Yarra Valley'), activityId: 'ME101', desc: 'Enjoy a luxurious private getaway to the beautiful Yarra Valley, complete with wine tastings, gourmet meals, and stunning scenery.' },
  { id: 2, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Melbourne', reward: '12 Apostles Helicopter Tour', pts: 197940, imageUrl: getImg('12 Apostles'), activityId: 'ME102', desc: 'Experience the breathtaking beauty of the Great Ocean Road and the iconic 12 Apostles from the air on a thrilling helicopter tour.' },

  // Las Vegas
  { id: 201, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Las Vegas', reward: 'Grand Canyon Helicopter Tour', pts: 85000, imageUrl: getImg('Grand Canyon'), desc: 'Take a thrilling helicopter flight from Las Vegas over the Hoover Dam and Lake Mead, landing deep within the Grand Canyon for a champagne picnic.', activityId: 'LV101' },
  { id: 202, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Las Vegas', reward: 'Cirque du Soleil Ticket', pts: 45000, imageUrl: getImg('Cirque Las Vegas'), desc: 'Experience the mesmerizing acrobatics and breathtaking performances of a world-renowned Cirque du Soleil show on the Las Vegas Strip.', activityId: 'LV102' },

  // Rome
  { id: 203, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Rome', reward: 'Vatican & Sistine Chapel Tour', pts: 35000, imageUrl: getImg('Vatican'), desc: 'Skip the line and explore the Vatican Museums, marvel at the Sistine Chapel ceiling, and walk through St. Peter\'s Basilica with an expert guide.', activityId: 'RM101' },
  { id: 204, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Rome', reward: 'Colosseum Underground Experience', pts: 42000, imageUrl: getImg('Colosseum'), desc: 'Gain exclusive access to the restricted underground chambers and arena floor of the Colosseum, discovering the secrets of the gladiators.', activityId: 'RM102' },

  // Paris
  { id: 205, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Paris', reward: 'Eiffel Tower Summit Access', pts: 28000, imageUrl: getImg('Eiffel Tower Focus'), desc: 'Ride the elevator to the very top of the Eiffel Tower and enjoy sweeping, unforgettable views over the romantic city of Paris.', activityId: 'PA101' },
  { id: 206, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Paris', reward: 'Louvre Museum Masterpieces Tour', pts: 32000, imageUrl: getImg('Louvre'), desc: 'Bypass the crowds and discover the Louvre\'s greatest treasures, including the Mona Lisa and the Venus de Milo, on a guided small-group tour.', activityId: 'PA102' },

  // London
  { id: 207, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'London', reward: 'Tower of London Crown Jewels', pts: 25000, imageUrl: getImg('Tower of London Focus'), desc: 'Explore the historic Tower of London, meet the Yeoman Warders, and marvel at the world-famous collection of Crown Jewels.', activityId: 'LD101' },
  { id: 208, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'London', reward: 'Thames River Dinner Cruise', pts: 55000, imageUrl: getImg('Thames Cruise'), desc: 'Enjoy a multi-course dinner, live entertainment, and stunning illuminated views of London\'s riverside landmarks on this relaxing evening cruise.', activityId: 'LD102' },

  // New York City
  { id: 209, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'New York City', reward: 'Statue of Liberty & Ellis Island', pts: 22000, imageUrl: getImg('Statue of Liberty'), desc: 'Take a ferry ride to iconic Liberty Island and learn about the immigrant experience at the historic Ellis Island National Museum of Immigration.', activityId: 'NY101' },
  { id: 210, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'New York City', reward: 'Broadway Show Premium Ticket', pts: 65000, imageUrl: getImg('Broadway'), desc: 'Secure a premium orchestra seat to a top-selling Broadway musical and experience the magic of New York\'s legendary theater district.', activityId: 'NY102' },

  // Washington DC
  { id: 211, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Washington DC', reward: 'Monuments by Moonlight Tour', pts: 18000, imageUrl: getImg('Washington Monument'), desc: 'Experience the grandeur of Washington DC\'s iconic monuments and memorials illuminated against the night sky on a guided trolley tour.', activityId: 'DC101' },

  // Cancun
  { id: 212, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Cancun', reward: 'Chichen Itza Day Trip', pts: 38000, imageUrl: getImg('Chichen Itza'), desc: 'Explore the magnificent Mayan ruins of Chichen Itza, swim in a sacred cenote, and enjoy a traditional Mexican buffet lunch.', activityId: 'CA101' },
  { id: 213, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Cancun', reward: 'Catamaran Sail & Snorkel', pts: 30000, imageUrl: getImg('Cancun Catamaran'), desc: 'Sail across the Caribbean Sea to Isla Mujeres, snorkel in crystal-clear waters, and relax with an open bar on luxury catamaran.', activityId: 'CA102' },

  // Florence
  { id: 214, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Florence', reward: 'Uffizi Gallery Fast-Track', pts: 29000, imageUrl: getImg('Uffizi'), desc: 'Skip the line and admire Renaissance masterpieces by Botticelli, Michelangelo, and Leonardo da Vinci in the renowned Uffizi Gallery.', activityId: 'FL101' },
  { id: 215, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Florence', reward: 'Tuscan Wine Tour', pts: 48000, imageUrl: getImg('Tuscan Wine'), desc: 'Venture into the rolling hills of Chianti for guided winery tours, wine tastings, and a traditional Tuscan lunch in scenic countryside.', activityId: 'FL102' },

  // Barcelona
  { id: 216, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Barcelona', reward: 'Sagrada Familia Guided Tour', pts: 26000, imageUrl: getImg('Sagrada Familia'), desc: 'Discover the fascinating history and intricate details of Antoni Gaudí\'s unfinished masterpiece, the stunning Sagrada Familia basilica.', activityId: 'BA101' },
  { id: 217, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Barcelona', reward: 'Tapas & Wine Walking Tour', pts: 35000, imageUrl: getImg('Barcelona Tapas'), desc: 'Stroll through the historic Gothic Quarter, stopping at authentic local bars to sample delicious tapas and regional Spanish wines.', activityId: 'BA102' },

  // Oahu
  { id: 218, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Oahu', reward: 'Pearl Harbor USS Arizona Tour', pts: 24000, imageUrl: getImg('Pearl Harbor'), desc: 'Pay your respects at the historic USS Arizona Memorial and learn about the events of WWII on a guided tour of Pearl Harbor.', activityId: 'HA101' },
  { id: 219, type: 'Qantas Activities Reward', icon: ActivityRewardIcon, city: 'Oahu', reward: 'Waikiki Sunset Catamaran Sail', pts: 32000, imageUrl: getImg('Waikiki Sunset'), desc: 'Set sail from Waikiki Beach, enjoy tropical cocktails, and watch a spectacular Hawaiian sunset from the deck of a catamaran.', activityId: 'HA102' }
];

export const marketplaceList = [
  // Appliances
  { id: 1, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Appliances', reward: 'KitchenAid Artisan Stand Mixer', pts: 209800, imageUrl: getImg('KitchenAid Mixer'), marketplaceId: 'kitchenaid-mixer', desc: 'A versatile and iconic stand mixer, perfect for baking, mixing, and kneading.' },
  { id: 4, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Appliances', reward: 'Roomba Combo Essential Robot', pts: 94800, imageUrl: getImg('Roomba'), marketplaceId: 'roomba-combo', desc: 'A 2-in-1 robot vacuum and mop with smart navigation and personalized cleaning.' },
  { id: 8, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Appliances', reward: 'Breville Essenza Coffee Machine', pts: 43800, imageUrl: getImg('Breville Machine'), marketplaceId: 'breville-essenza', desc: 'Compact espresso machine creating café-quality coffee at home in minutes.' },
  { id: 9, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Appliances', reward: 'Ninja Foodi Airfryer Max', pts: 39800, imageUrl: getImg('Ninja Airfryer'), marketplaceId: 'ninja-airfryer', desc: 'Family-sized air fryer with multiple cooking functions for quick, healthy meals.' },

  // Electronics
  { id: 2, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Electronics', reward: 'Samsung 65-inch 4K Smart TV', pts: 174500, imageUrl: getImg('Samsung TV'), marketplaceId: 'samsung-65-tv', desc: 'Experience vibrant crystal color and stunning 4K detail with this sleek Smart TV.' },
  { id: 5, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Electronics', reward: 'Ultimate Ears Bluetooth Speaker', pts: 69860, imageUrl: getImg('UE Speaker'), marketplaceId: 'ue-boom', desc: 'Portable waterproof Bluetooth speaker with bold immersive 360-degree sound.' },
  { id: 7, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Electronics', reward: 'Bose QuietComfort Headphones', pts: 52700, imageUrl: getImg('Bose Headphones'), marketplaceId: 'bose-qc', desc: 'Premium wireless noise-cancelling headphones for uninterrupted listening.' },

  // Beauty, health and personal care
  { id: 3, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Beauty, health and personal care', reward: 'Dyson Supersonic Hair Dryer', pts: 119800, imageUrl: getImg('Dyson Dryer'), marketplaceId: 'dyson-supersonic', desc: 'Engineered for fast drying and precision styling, while protecting hair from extreme heat.' },

  // Home
  { id: 6, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Home', reward: 'Tefal 5 Piece Cookware Set', pts: 59800, imageUrl: getImg('Tefal Set'), marketplaceId: 'tefal-set', desc: 'A high-quality non-stick cookware set designed for everyday culinary excellence.' },
  { id: 11, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Home', reward: 'Royal Comfort Towel Set', pts: 21800, imageUrl: getImg('Towel Set'), marketplaceId: 'towel-set', desc: 'Luxury 100% Egyptian Cotton towel set offering plush softness and absorbency.' },

  // Travel
  { id: 10, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Travel', reward: 'Samsonite 55cm Suitcase', pts: 32800, imageUrl: getImg('Samsonite Suitcase'), marketplaceId: 'samsonite-suitcase', desc: 'Lightweight and exceptionally durable carry-on spinner for seamless travel.' },
  { id: 13, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Travel', reward: 'Apple Airtag', pts: 9800, imageUrl: getImg('Apple Airtag'), marketplaceId: 'apple-airtag', desc: 'Keep track of keys, wallets, and luggage easily with the Find My app.' },

  // Sports, fitness and adventure
  { id: 12, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Sports, fitness and adventure', reward: 'Wallabies Jersey - Womens', pts: 12960, imageUrl: getImg('Wallabies Jersey'), marketplaceId: 'wallabies-jersey', desc: 'Show your support with this official Wallabies replica jersey, designed for comfort.' },
  { id: 301, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Sports, fitness and adventure', reward: 'Garmin Forerunner 255', pts: 95000, imageUrl: getImg('Garmin Watch'), marketplaceId: 'garmin-forerunner', desc: 'Advanced GPS running smartwatch offering tailored training plans and performance metrics.' },

  // Outdoor living
  { id: 305, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Outdoor living', reward: 'Weber Baby Q', pts: 78000, imageUrl: getImg('Weber Baby Q'), marketplaceId: 'weber-baby-q', desc: 'Compact and portable gas barbecue perfect for grilling on the go or relaxing outdoors.' },

  // Women's fashion
  { id: 302, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: "Women's fashion", reward: 'RM Williams Lady Yearling Boots', pts: 145000, imageUrl: getImg('RM Williams Boots'), marketplaceId: 'rmw-lady-yearling', desc: 'Iconic Australian leather boots handcrafted for durability and timeless style.' },

  // Men's fashion
  { id: 303, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: "Men's fashion", reward: 'Ray-Ban Aviator Classic', pts: 45000, imageUrl: getImg('RayBan Aviator'), marketplaceId: 'rayban-aviator', desc: 'The iconic Ray-Ban Aviator sunglasses, offering timeless teardrop style and premium UV protection.' },

  // Baby, kids and toys
  { id: 304, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Baby, kids and toys', reward: 'LEGO Star Wars Millennium Falcon', pts: 42000, imageUrl: getImg('LEGO Falcon'), marketplaceId: 'lego-falcon', desc: 'Build the legendary Millennium Falcon with this highly detailed and engaging LEGO set.' },

  // Qantas merchandise
  { id: 14, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Qantas merchandise', reward: 'Qantas Luggage Tag', pts: 4000, imageUrl: getImg('Luggage Tag'), marketplaceId: 'qantas-luggage-tag', desc: 'Durable and stylish Qantas luggage tag to easily identify your bags while flying.' },
  { id: 15, type: 'Qantas Marketplace Reward', icon: MarketplaceRewardIcon, marketCategory: 'Qantas merchandise', reward: 'Qantas Model Aeroplane', pts: 2400, imageUrl: getImg('Model Aeroplane'), marketplaceId: 'qantas-model-plane', desc: '1/200 Standard Livery - 787-9\nThe Boeing 787-9. Livery/Paint scheme: Qantas Airways.' }
];

export const giftCardsList = [
  { id: 1, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Myer Gift Card - $1000', pts: 207250, imageUrl: getImg('Myer Gift Card') },
  { id: 2, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Digital Mastercard - $500', pts: 121850, imageUrl: getImg('Mastercard') },
  { id: 3, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Airbnb Gift Card - $500', pts: 105650, imageUrl: getImg('Airbnb Gift Card') },
  { id: 4, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Amazon Gift Card - $250', pts: 54450, imageUrl: getImg('Amazon Gift Card') },
  { id: 5, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'JB Hifi Gift Card - $250', pts: 51850, imageUrl: getImg('JB Hifi') },
  { id: 6, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Green Card - $100', pts: 44610, imageUrl: getImg('Green Card') },
  { id: 7, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Red Balloon Gift Voucher', pts: 20000, imageUrl: getImg('Red Balloon') },
  { id: 8, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Bunnings Gift Card - $50', pts: 11690, imageUrl: getImg('Bunnings') },
  { id: 9, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Everyday Wish Gift Card - $25', pts: 5500, imageUrl: getImg('Wish Card') },
  { id: 10, type: 'Gift Card', icon: GiftCardRewardIcon, reward: 'Hoyts Gift Card - $20', pts: 4400, imageUrl: getImg('Hoyts Card') }
];

export const entertainmentList = [
  { id: 1, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'Keith Urban Tour VIP Ticket', pts: 150000, imageUrl: getImg('Keith Urban') },
  { id: 2, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'NRL Grand Final Premium Seat', pts: 133333, imageUrl: getImg('NRL Final') },
  { id: 3, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'Melbourne Cup Package', pts: 116667, imageUrl: getImg('Melbourne Cup') },
  { id: 4, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'Back to the Future Musical Ticket', pts: 100000, imageUrl: getImg('BTTF Musical') },
  { id: 5, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'Cirque du Soleil Premium Ticket', pts: 60000, imageUrl: getImg('Cirque') },
  { id: 6, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'MJ: The Musical Ticket', pts: 33333, imageUrl: getImg('MJ Musical') },
  { id: 7, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'Big Bash League T20 Ticket', pts: 10000, imageUrl: getImg('BBL Ticket') },
  { id: 8, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'Royal Easter Show Entry', pts: 7500, imageUrl: getImg('Easter Show') },
  { id: 9, type: 'Entertainment Reward', icon: EntertainmentRewardIcon, reward: 'A-League Soccer Match Ticket', pts: 4167, imageUrl: getImg('A-League Ticket') }
];