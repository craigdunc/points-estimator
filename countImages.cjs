const fs = require('fs');

const dataJs = fs.readFileSync('./src/data.js', 'utf-8');

// Parse out localRewardImages keys
const localImagesRegex = /const localRewardImages\s*=\s*{([\s\S]*?)};/;
const localImagesMatch = dataJs.match(localImagesRegex);
let localKeys = [];
if (localImagesMatch) {
    const lines = localImagesMatch[1].split('\n');
    lines.forEach(line => {
        const match = line.match(/^\s*'([^']+)'\s*:/);
        if (match) localKeys.push(match[1]);
    });
}

// Find all imageUrl usages
const allUsagesRegex = /imageUrl:\s*(?:getImg\('([^']+)'\)|([a-zA-Z0-9_]+Img))/g;
let matches = [...dataJs.matchAll(allUsagesRegex)];

let real = 0;
let fake = 0;
let missed = [];

matches.forEach(m => {
    const isGetImg = m[1];
    const isDirect = m[2];

    if (isDirect) {
        real++; // Direct imports imply real images
    } else if (isGetImg) {
        if (localKeys.includes(isGetImg)) {
            real++;
        } else {
            fake++;
            missed.push(isGetImg);
        }
    }
});

console.log('Real images count:', real);
console.log('Placeholder images count:', fake);
console.log('Items missing images:', missed.join(', '));
