import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        res.json(products);
    } catch (error) {
        console.error("Fetch products error:", error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get product by slug
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findUnique({
            where: { slug: req.params.slug as string },
            include: { category: true }
        });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Create product
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, categoryId, images, tags } = req.body;
        console.log("Create Product Body:", req.body);

        if (!name) {
            res.status(400).json({ error: 'Product name is required' });
            return;
        }
        if (price === undefined || price === null) {
            res.status(400).json({ error: 'Price is required' });
            return;
        }
        if (!categoryId) {
            res.status(400).json({ error: 'Category is required. Please create a category first.' });
            return;
        }

        // Generate base slug
        let slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        // Ensure uniqueness
        const existingProduct = await prisma.product.findUnique({ where: { slug } });
        if (existingProduct) {
            slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
        }

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price,
                stock: Number(stock), // Ensure number
                categoryId,
                images: images || [],
                tags: tags || []
            }
        });
        res.status(201).json(product);
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Update product
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.update({
            where: { id: req.params.id as string },
            data: req.body
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete product
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await prisma.product.delete({
            where: { id: req.params.id as string }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
