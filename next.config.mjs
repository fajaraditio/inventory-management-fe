/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    env: {
        mapsAPIKey: process.env.GOOGLE_CLOUD_API_KEY
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ]
    },
};

export default withNextIntl(nextConfig);
