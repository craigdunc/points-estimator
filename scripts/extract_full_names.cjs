const fs = require('fs');
const path = require('path');

const d = path.join(process.cwd(), 'src', 'components');
const files = fs.readdirSync(d).filter(f => f.startsWith('FindOutMore') && f.endsWith('.jsx'));

let out = {};

files.forEach(f => {
    let c = fs.readFileSync(path.join(d, f), 'utf8');
    let map = {};

    const parts = c.split('{');
    parts.forEach(p => {
        const block = p.split('}')[0];
        const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
        const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
        const rewardMatch = block.match(/reward:\s*['"]([^'"]+)['"]/);
        const catMatch = block.match(/category:\s*['"]([^'"]+)['"]/);

        if (idMatch && (nameMatch || rewardMatch)) {
            map[idMatch[1]] = {
                name: nameMatch ? nameMatch[1] : rewardMatch[1],
                category: catMatch ? catMatch[1] : ''
            };
        }
    });

    const matchID = c.match(/wteFavourites\?\.(?:\[(\d+)\])/);
    if (matchID && Object.keys(map).length > 0) {
        out[matchID[1]] = map;
    }
});

fs.writeFileSync(path.join(process.cwd(), 'src', 'wteSubItems.json'), JSON.stringify(out, null, 2));
console.log('Created src/wteSubItems.json');
