export default async function handler(req, res) {
    const apiKey = process.env.API_NINJA_KEY;

    const { month, day } = req.query;

    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v1/historicalevents?month=${month}&day=${day}`,
            {
                headers: {
                    'X-Api-Key': apiKey,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // Sort the data
        data.sort((a, b) => parseInt(b.year) - parseInt(a.year));

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching historical events' });
    }
}