const fs = require('fs');
const path = require('path');

const d = path.join(process.cwd(), 'src', 'components');

const correctMap = {
    'FindOutMoreEveryday.jsx': 2,
    'FindOutMoreNoFeeCards.jsx': 3,
    'FindOutMoreCards.jsx': 12,
    'FindOutMoreMarketplace.jsx': 19,
    'FindOutMoreFlight.jsx': 22,
    'FindOutMoreHotels.jsx': 23,
    'FindOutMoreActivities.jsx': 24,
    'FindOutMoreCars.jsx': 25,
    'FindOutMoreHolidays.jsx': 28,
    'FindOutMoreTAD.jsx': 29,
    'FindOutMoreCruises.jsx': 30,
    'FindOutMoreDirect.jsx': 21,
    'FindOutMoreOnlineMall.jsx': 20,
    'FindOutMoreBP.jsx': 4,
    'FindOutMoreWine.jsx': 16,
    'FindOutMoreBinge.jsx': 7,
    'FindOutMoreWellbeing.jsx': 5
};

for (const [f, id] of Object.entries(correctMap)) {
    const p = path.join(d, f);
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');

        // Remove the setFavorites useState
        // We expect: `const [favorites, setFavorites] = useState(new Set(current?.wteFavourites?.[XY] || []));`
        const stateRegex = /const \[favorites,\s*setFavorites\]\s*=\s*useState\(new Set\(current\?\.wteFavourites\?\.\[\d+\]\s*\|\|\s*\[\]\)\);/;

        // Replace it with just a derived variable
        c = c.replace(stateRegex, `const favorites = new Set(current?.wteFavourites?.[${id}] || []);`);

        // We also need to rewrite the toggleFav function.
        // It currently uses `setFavorites(prev => { ... updateWTEFavourites... return next })`
        // We should rewrite it to just call `updateWTEFavourites(id, String(subId))` directly.
        const toggleRegex = /const toggleFav = \((.*?)\) => \{[\s\S]*?return next;\s*\n\s*\};\n/;

        // Some toggleFav definitions don't have exactly this structure or might be messed up from our earlier regexes.
        // So let's match anything that looks like: `const toggleFav = ...` down to the next `const ` or `return (`.
        c = c.replace(/const toggleFav = \(id\) => \{[\s\S]*?updateWTEFavourites\([\s\S]*?\};\n/m, `const toggleFav = (id) => {\n        updateWTEFavourites(${id}, String(id));\n    };\n`);

        fs.writeFileSync(p, c);
        console.log(`Updated ${f} to use derived state`);
    }
}
