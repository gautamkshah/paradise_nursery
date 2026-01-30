import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all categories
router.get('/', async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(categories);
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});


// Create category
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, image, description } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const category = await prisma.category.create({
            data: { name, slug, image, description }
        });
        res.status(201).json(category);
    } catch (error) {
        console.error("Create category error:", error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Update category
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { name, image, description } = req.body;

        const updateData: any = {};
        if (name) {
            updateData.name = name;
            updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
        if (image !== undefined) updateData.image = image;
        if (description !== undefined) updateData.description = description;

        const category = await prisma.category.update({
            where: { id },
            data: updateData
        });
        res.json(category);
    } catch (error) {
        console.error("Update category error:", error);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

export default router;
