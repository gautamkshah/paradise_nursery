import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // 1. Categories
    const indoor = await prisma.category.upsert({
        where: { slug: 'indoor' },
        update: {},
        create: { name: 'Indoor Plants', slug: 'indoor' },
    });

    const lowLight = await prisma.category.upsert({
        where: { slug: 'low-light' },
        update: {},
        create: { name: 'Low Light', slug: 'low-light' },
    });

    // 2. Products
    const products = [
        {
            name: 'Monstera Deliciosa',
            slug: 'monstera-deliciosa',
            description: 'The "Swiss Cheese Plant" is famous for its natural holey leaves. A fast grower that adds instant tropical vibes to any room.',
            price: 45.00,
            categoryId: indoor.id,
            images: ['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800'],
            tags: ['tropical', 'statement', 'easy-care']
        },
        {
            name: 'Fiddle Leaf Fig',
            slug: 'fiddle-leaf-fig',
            description: 'With its broad, violin-shaped leaves, the Fiddle Leaf Fig is the darling of the design world. Requires bright, indirect light.',
            price: 65.00,
            categoryId: indoor.id,
            images: ['https://images.unsplash.com/photo-1627265910385-bd97c0f1e0d3?auto=format&fit=crop&q=80&w=800'],
            tags: ['statement', 'bright-light']
        },
        {
            name: 'Snake Plant (Sansevieria)',
            slug: 'snake-plant',
            description: 'Indestructible and architectural. The Snake Plant purifies air and thrives on neglect. Perfect for beginners.',
            price: 25.00,
            categoryId: lowLight.id,
            images: ['https://images.unsplash.com/photo-1599598425947-d352796e6a4b?auto=format&fit=crop&q=80&w=800'],
            tags: ['air-purifying', 'low-light', 'indestructible']
        },
        {
            name: 'ZZ Plant',
            slug: 'zz-plant',
            description: 'With waxy, emerald green leaves, the ZZ Plant reflects sunlight and brightens dark corners. Extremely drought tolerant.',
            price: 35.00,
            categoryId: lowLight.id,
            images: ['https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&q=80&w=800'],
            tags: ['low-light', 'drought-tolerant']
        },
        {
            name: 'Peace Lily',
            slug: 'peace-lily',
            description: 'Elegant white blooms and lush dark leaves. The Peace Lily tells you when it is thirsty by gently drooping.',
            price: 28.00,
            categoryId: indoor.id,
            images: ['https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&q=80&w=800'],
            tags: ['flowering', 'air-purifying']
        },
        {
            name: 'Pothos (Devil\'s Ivy)',
            slug: 'golden-pothos',
            description: 'A trailing beauty that grows fast and hangs elegantly. Can survive in almost any lighting condition.',
            price: 18.00,
            categoryId: lowLight.id,
            images: ['https://images.unsplash.com/photo-1596724815413-5a04df0c345b?auto=format&fit=crop&q=80&w=800'],
            tags: ['trailing', 'fast-growing', 'beginner']
        }
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                name: p.name,
                slug: p.slug,
                description: p.description,
                price: p.price,
                categoryId: p.categoryId,
                images: p.images,
                tags: p.tags
            }
        });
    }

    // 3. Admin User
    const adminPassword = await import('bcryptjs').then(bcrypt => bcrypt.hash('admin123', 10));
    const admin = await prisma.user.upsert({
        where: { email: 'admin@paradise.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@paradise.com',
            password: adminPassword,
            role: 'ADMIN'
        }
    });
    console.log({ admin });

    console.log(`Seeded ${products.length} products and Admin user.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
