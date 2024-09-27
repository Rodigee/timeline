import prisma from '../lib/prisma'

export default async function handler(req, res) {
    const { month, day } = req.query

    try {
        const events = await prisma.historicalEvent.findMany({
            where: {
                month: parseInt(month),
                day: parseInt(day),
            },
            orderBy: [
                { year: 'asc' },
                { event: 'asc' }
            ]
        })

        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching historical events' })
    } finally {
        await prisma.$disconnect()
    }
}