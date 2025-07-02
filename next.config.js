/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Nouvelle configuration ajoutée
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    },

    // Configuration des en-têtes de sécurité
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    }
                ],
            },
        ];
    },

    // Important pour NextAuth.js
    images: {
        domains: ['localhost'], // Ajoutez vos domaines d'images
    },
};

module.exports = nextConfig;