// pages/api/inventions.js
import prisma from '@/lib/prisma';
import { shuffleArray } from './utils'; 

export default async function handler(req, res) {
    const { startYear, endYear, random } = req.query

    try {
        const whereClause = {}

        if (startYear || endYear) {
            whereClause.year = {}
            if (startYear) {
                whereClause.year.gte = parseInt(startYear)
            }
            if (endYear) {
                whereClause.year.lte = parseInt(endYear)
            }
        }

        let inventions;

        if (random === 'true') {
            inventions = await prisma.invention.findMany({
                where: whereClause,
                orderBy: [
                    { year: 'asc' },
                    { event: 'asc' }
                ]
            })

            inventions = shuffleArray(inventions).slice(0, 10);
        } else {
            // take the first 10 inventions
            inventions = await prisma.invention.findMany({
                where: whereClause,
                orderBy: [
                    { year: 'asc' },
                    { event: 'asc' }
                ],
                take: 10
            })
        }

        res.status(200).json(inventions)
    } catch (error) {
        console.error('Error fetching inventions:', error)
        res.status(500).json({ error: 'Error fetching inventions' })
    } finally {
        await prisma.$disconnect()
    }
}