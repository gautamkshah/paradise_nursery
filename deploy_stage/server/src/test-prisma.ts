import "dotenv/config";
import { PrismaClient } from '@prisma/client';

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Connecting...");
        await prisma.$connect();
        console.log("Connected successfully!");
        const count = await prisma.user.count();
        console.log("User count:", count);
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
