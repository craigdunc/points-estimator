const fs = require('fs');
const path = require('path');

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
    const p = path.join(process.cwd(), 'src', 'components', f);
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');
        if (!c.includes('useSaveSlots')) {
            const parts = c.split('\n');
            parts.splice(1, 0, "import { useSaveSlots } from '../state/useSaveSlots';");
            c = parts.join('\n');

            const compName = f.replace('.jsx', '');
            c = c.replace(
                `export default function ${compName}({ onClose }) {`,
                `export default function ${compName}({ onClose }) {\n    const { current, updateWTEFavourites } = useSaveSlots();`
            );

            c = c.replace(
                'useState(new Set())',
                `useState(new Set(current?.wteFavourites?.[${id}] || []))`
            );

            const match = c.match(/toggleFav = \((.*?)\)/);
            if (match) {
                const varName = match[1];
                c = c.replace(
                    'return next;\n        });',
                    `updateWTEFavourites(${id}, String(${varName}));\n            return next;\n        });`
                );
                fs.writeFileSync(p, c);
                console.log(`Updated ${f}`);
            }
        }
    }
}
console.log('Done');
