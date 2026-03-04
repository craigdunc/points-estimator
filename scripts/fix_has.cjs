const fs = require('fs');
const path = require('path');

const d = path.join(process.cwd(), 'src', 'components');

const files = fs.readdirSync(d).filter(f => f.startsWith('FindOutMore') && f.endsWith('.jsx'));

for (const f of files) {
    const p = path.join(d, f);
    let c = fs.readFileSync(p, 'utf8');

    // We are searching for `favorites.has(` and replacing its parameter with String(...)
    // e.g. favorites.has(p.id) -> favorites.has(String(p.id))
    // e.g. favorites.has(h.id) -> favorites.has(String(h.id))
    c = c.replace(/favorites\.has\(([^)]+)\)/g, (match, p1) => {
        if (p1.startsWith('String(')) return match;
        return `favorites.has(String(${p1}))`;
    });

    fs.writeFileSync(p, c);
    console.log(`Updated favorites.has in ${f}`);
}
