const fs = require('fs');
const path = require('path');

const d = path.join(process.cwd(), 'src', 'components');
const files = fs.readdirSync(d).filter(f => f.startsWith('FindOutMore') && f.endsWith('.jsx'));

let out = {};

files.forEach(f => {
    let c = fs.readFileSync(path.join(d, f), 'utf8');
    let map = {};
    const nameRegex = /{ *id: *['"](\d+)['"], *name: *['"]([^'"]+)['"]/g;
    let match;
    while ((match = nameRegex.exec(c)) !== null) {
        map[match[1]] = match[2];
    }
    const matchID = c.match(/wteFavourites\?\.\[(\d+)\]/);
    if (matchID && Object.keys(map).length > 0) {
        out[matchID[1]] = map;
    }
});

fs.writeFileSync(path.join(process.cwd(), 'src', 'wteSubItemNames.json'), JSON.stringify(out, null, 2));
console.log('Created src/wteSubItemNames.json');
