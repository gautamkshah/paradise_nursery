import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// global type for items in the request body
interface OrderItemInput {
    productId: string;
    qty: number;
    price: number;
}

// Create order
router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            customerName, phone, whatsapp, address, city, pincode,
            items, totalAmount, paymentMode, userId
        } = req.body;

        const order = await prisma.$transaction(async (tx: any) => {
            // Create the order
            const newOrder = await tx.order.create({
                data: {
                    customerName, phone, whatsapp, address, city, pincode,
                    totalAmount, paymentMode, userId,
                    items: {
                        create: items.map((item: OrderItemInput) => ({
                            productId: item.productId,
                            qty: item.qty,
                            price: item.price
                        }))
                    }
                },
                include: { items: true }
            });

            // Update stock
            for (const item of items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.qty } }
                });
            }

            return newOrder;
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Get all orders (Admin)
router.get('/', async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Get orders by user ID
router.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user orders' });
    }
});

// Update order status
router.put('/:id/status', async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const order = await prisma.order.update({
            where: { id: req.params.id as string },
            data: { status }
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

export default router;
