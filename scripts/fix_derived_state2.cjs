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

        // 1. Remove useState for favorites
        // The previous step might have already done this depending on the regex. Let's check:
        if (c.includes(`const [favorites, setFavorites] = useState(new Set(current?.wteFavourites?.[${id}] || []));`)) {
            c = c.replace(`const [favorites, setFavorites] = useState(new Set(current?.wteFavourites?.[${id}] || []));`, `const favorites = new Set(current?.wteFavourites?.[${id}] || []);`);
        } else if (c.includes(`const [favorites, setFavorites] = useState(new Set(current?.wteFavourites?.[`)) {
            // Fallback catch if the id was wrong but left over
            c = c.replace(/const \[favorites,\s*setFavorites\]\s*=\s*useState\(new Set\(current\?\.wteFavourites\?\.\[.*?\]\s*\|\|\s*\[\]\)\);/, `const favorites = new Set(current?.wteFavourites?.[${id}] || []);`);
        }

        // 2. Rewrite toggleFav
        const startIdx = c.indexOf('const toggleFav =');
        if (startIdx !== -1) {
            const endIdx = c.indexOf('};', startIdx);
            if (endIdx !== -1) {
                const before = c.substring(0, startIdx);
                const after = c.substring(endIdx + 2);
                c = before + `const toggleFav = (itemId) => {\n        updateWTEFavourites(${id}, String(itemId));\n    };` + after;
            }
        }

        fs.writeFileSync(p, c);
        console.log(`Rewrote state for ${f}`);
    }
}
