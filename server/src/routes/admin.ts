import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Middleware to check admin role will be added here

router.get('/dashboard', async (req: Request, res: Response) => {
    try {
        const [totalOrders, totalRevenue, pendingOrders, lowStockProducts] = await Promise.all([
            prisma.order.count(),
            prisma.order.aggregate({
                _sum: { totalAmount: true },
                where: {
                    status: { not: 'CANCELLED' }
                }
            }),
            prisma.order.count({
                where: { status: 'PENDING' }
            }),
            prisma.product.count({
                where: { stock: { lte: 5 } }
            })
        ]);

        res.json({
            stats: {
                totalOrders,
                totalRevenue: totalRevenue._sum.totalAmount || 0,
                pendingOrders,
                lowStockProducts
            }
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

export default router;
