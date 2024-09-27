import prisma from '@/lib/prisma'

export default async function handler(req, res) {
    const { month, day } = req.query

    try {
        const events = await prisma.wikiHistoricalEvent.findMany({
            where: {
                month: parseInt(month),
                day: parseInt(day),
            },
            orderBy: [
                { year: 'asc' },
                { event: 'asc' }
            ],
            take: 10
        })

        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Wiki historical events' })
    } finally {
        await prisma.$disconnect()
    }
}