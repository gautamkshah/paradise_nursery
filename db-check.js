const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Attempting database connection...");
    try {
        await prisma.$connect();
        console.log("DB_CONNECTED_SUCCESSFULLY");
        const count = await prisma.user.count();
        console.log(`User count: ${count}`);
    } catch (e) {
        console.error("DB_CONNECTION_FAILED");
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
