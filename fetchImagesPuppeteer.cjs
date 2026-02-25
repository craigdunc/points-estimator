const puppeteer = require('puppeteer');
const fs = require('fs');

const hotels = [
    '128821', '372910', '143229', '982732', '802143', '119283', '298112', '682121', '772154', '492811', '553821', '882191', '183922', '472881', '192833', '102928', '662912', '112833', '571922'
];

const marketplaces = [
    'kitchenaid-mixer', 'roomba-combo', 'breville-essenza', 'ninja-airfryer', 'samsung-65-tv', 'ue-boom', 'bose-qc', 'dyson-supersonic', 'tefal-set', 'towel-set', 'samsonite-suitcase', 'apple-airtag', 'wallabies-jersey', 'garmin-forerunner', 'weber-baby-q', 'rmw-lady-yearling', 'rayban-aviator', 'lego-falcon', 'qantas-luggage-tag', 'qantas-model-plane'
];

const mapping = {};

async function run() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36');

    console.log('Fetching hotel images...');
    for (const id of hotels) {
        try {
            await page.goto(`https://www.qantas.com/hotels/properties/${id}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
            const img = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => null);
            if (img) mapping[`property-${id}`] = img;
            console.log(`Hotel ${id}: ${img ? 'Found' : 'Skipped'}`);
        } catch (e) { console.log(`Hotel ${id}: Error`); }
    }

    console.log('Fetching marketplace images...');
    for (const id of marketplaces) {
        try {
            await page.goto(`https://marketplace.qantas.com/p/${id}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
            const img = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => null);
            if (img) mapping[`marketplace-${id}`] = img;
            console.log(`Marketplace ${id}: ${img ? 'Found' : 'Skipped'}`);
        } catch (e) { console.log(`Marketplace ${id}: Error`); }
    }

    await browser.close();
    fs.writeFileSync('src/dynamicImages.json', JSON.stringify(mapping, null, 2));
    console.log('Done!');
}

run();
