const { PrismaClient } = require('@prisma/client')
const https = require('https')
require('dotenv').config()

const prisma = new PrismaClient()

function httpsGet(url, headers) {
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

async function fetchAndStoreEvents() {
    const apiKey = process.env.API_NINJA_KEY

    if (!apiKey) {
        console.error('API_NINJA_KEY is not set in environment variables');
        process.exit(1);
    }

    console.log('Using API key:', apiKey.substring(0, 5) + '...');  // Log first 5 characters of API key

    for (let month = 1; month <= 12; month++) {
        for (let day = 1; day <= 31; day++) {
            try {
                const url = `https://api.api-ninjas.com/v1/historicalevents?month=${month}&day=${day}`;
                console.log(`Fetching data from: ${url}`);

                const response = await httpsGet(url, { 'X-Api-Key': apiKey });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch data. Status: ${response.status}, Response: ${errorText}`);
                }

                const events = await response.json();

                for (const event of events) {
                    await prisma.historicalEvent.create({
                        data: {
                            year: parseInt(event.year),
                            month,
                            day,
                            event: event.event,
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

fetchAndStoreEvents()
    .catch((e) => {
        console.error('Unhandled error:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });