import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Paradise Nursery',
        short_name: 'Paradise',
        description: 'Premium Indoor & Outdoor Plants',
        start_url: '/',
        display: 'standalone',
        background_color: '#f0f9f0',
        theme_color: '#2d5a27',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
