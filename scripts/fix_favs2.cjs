const fs = require('fs');
const path = require('path');

const d = path.join(process.cwd(), 'src', 'components');
const m = {
    'FindOutMoreEveryday.jsx': 2,
    'FindOutMoreNoFeeCards.jsx': 3,
    'FindOutMoreCards.jsx': 12,
    'FindOutMoreMarketplace.jsx': 19,
    'FindOutMoreFlight.jsx': 22,
    'FindOutMoreHotels.jsx': 23,
    'FindOutMoreActivities.jsx': 24,
    'FindOutMoreCars.jsx': 27,
    'FindOutMoreHolidays.jsx': 28,
    'FindOutMoreTAD.jsx': 29,
    'FindOutMoreCruises.jsx': 30,
    'FindOutMoreDirect.jsx': 34,
    'FindOutMoreOnlineMall.jsx': 35,
    'FindOutMoreBP.jsx': 36,
    'FindOutMoreWine.jsx': 38,
    'FindOutMoreBinge.jsx': 39,
    'FindOutMoreWellbeing.jsx': 40
};

for (const [f, id] of Object.entries(m)) {
    const p = path.join(d, f);
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');
        if (!c.includes(`updateWTEFavourites(${id}`)) {
            const match = c.match(/toggleFav\s*=\s*\((.*?)\)/);
            if (match) {
                const v = match[1];
                // The regex catches "return next; [whitespace] });" and replaces it with the updated block
                c = c.replace(
                    /return\s+next;\s*\}\);/,
                    `updateWTEFavourites(${id}, String(${v}));\n            return next;\n        });`
                );
                fs.writeFileSync(p, c);
                console.log(`Successfully fixed ${f}`);
            }
        }
    }
}
