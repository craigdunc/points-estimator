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

        // Change useState(new Set(current?.wteFavourites?.[WRONG] || []))
        // to useState(new Set(current?.wteFavourites?.[RIGHT] || []))
        c = c.replace(/useState\(new Set\(current\?\.wteFavourites\?\.\[\d+\] \|\| \[\]\)\)/, `useState(new Set(current?.wteFavourites?.[${id}] || []))`);

        // Change updateWTEFavourites(WRONG, ...)
        // to updateWTEFavourites(RIGHT, ...)
        c = c.replace(/updateWTEFavourites\(\d+,\s*String\((.*?)\)\)/, `updateWTEFavourites(${id}, String($1))`);

        fs.writeFileSync(p, c);
        console.log(`Updated IDs in ${f} to ${id}`);
    }
}
