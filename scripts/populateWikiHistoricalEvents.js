import prisma from '../lib/prisma'
const https = require('https')
require('dotenv').config()

function httpsGet(url, headers = {}) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({
                    ok: res.statusCode === 200,
                    status: res.statusCode,
                    json: () => JSON.parse(data),
                    text: () => data
                });
            });
        }).on('error', reject);
    });
}

async function fetchAndStoreWikiEvents() {
    for (let month = 1; month <= 12; month++) {
        for (let day = 1; day <= 31; day++) {
            try {
                const paddedMonth = month.toString().padStart(2, '0');
                const paddedDay = day.toString().padStart(2, '0');
                const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${paddedMonth}/${paddedDay}`;
                console.log(`Fetching data from: ${url}`);

                const response = await httpsGet(url);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch data. Status: ${response.status}, Response: ${errorText}`);
                }

                const data = await response.json();
                const events = data.events;

                for (const event of events) {
                    const thumbnailUrl = event.pages[0]?.thumbnail?.source || null;

                    await prisma.wikiHistoricalEvent.create({
                        data: {
                            year: event.year,
                            month,
                            day,
                            event: event.text,
                            thumbnail_url: thumbnailUrl,
                        },
                    });
                }

                console.log(`Stored events for ${month}/${day}`);
            } catch (error) {
                console.error(`Error fetching/storing events for ${month}/${day}:`, error.message);
            }
        }
    }
}

fetchAndStoreWikiEvents()
    .catch((e) => {
        console.error('Unhandled error:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });