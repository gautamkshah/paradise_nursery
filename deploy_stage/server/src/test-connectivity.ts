import dns from 'dns';
import net from 'net';
import { URL } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// Load .env explicitly
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const dbUrl = process.env.DATABASE_URL;

async function main() {
    console.log('--- Connectivity Test Start ---');
    if (!dbUrl) {
        console.error('❌ DATABASE_URL is not defined');
        return;
    }

    try {
        const parsedUrl = new URL(dbUrl);
        const host = parsedUrl.hostname;
        const port = parseInt(parsedUrl.port || '5432', 10);

        console.log(`Target: ${host}:${port}`);

        // 1. DNS
        console.log('1. Checking DNS...');
        try {
            const { address } = await dns.promises.lookup(host);
            console.log(`   ✅ Resolved: ${address}`);

            // 2. TCP
            console.log('2. Checking TCP...');
            await checkTcp(host, port);

        } catch (err: any) {
            console.error(`   ❌ DNS Failed: ${err.message}`);
        }

    } catch (e: any) {
        console.error('❌ Error parsing URL:', e.message);
    }
    console.log('--- Connectivity Test End ---');
}

function checkTcp(host: string, port: number): Promise<void> {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(5000);

        socket.on('connect', () => {
            console.log('   ✅ TCP Connection Successful');
            socket.destroy();
            resolve();
        });

        socket.on('timeout', () => {
            console.error('   ❌ TCP Timeout (5s)');
            socket.destroy();
            resolve();
        });

        socket.on('error', (err) => {
            console.error(`   ❌ TCP Error: ${err.message}`);
            resolve();
        });

        socket.connect(port, host);
    });
}

main();
