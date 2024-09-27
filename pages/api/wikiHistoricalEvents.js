import prisma from '@/lib/prisma'

export default async function handler(req, res) {
    const { month, day, startYear, endYear } = req.query

    try {
        const whereClause = {
            month: parseInt(month),
            day: parseInt(day),
        }

        if (startYear || endYear) {
            whereClause.year = {}
            if (startYear) {
                whereClause.year.gte = parseInt(startYear)
            }
            if (endYear) {
                whereClause.year.lte = parseInt(endYear)
            }
        }

        const events = await prisma.wikiHistoricalEvent.findMany({
            where: whereClause,
            orderBy: [
                { year: 'asc' },
                { event: 'asc' }
            ],
            take: 10
        })

        res.status(200).json(events)
    } catch (error) {
        console.error('Error fetching Wiki historical events:', error)
        res.status(500).json({ error: 'Error fetching Wiki historical events' })
    } finally {
        await prisma.$disconnect()
    }
}