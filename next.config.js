/** @type {import('next').NextConfig} */
const nextConfig = {
    // Supprimez ou mettez à jour les options expérimentales
    experimental: {
        // appDir: true,  // <-- Supprimez cette ligne si vous utilisez Next.js 15+
    },
    output: 'standalone', // Recommandé pour Vercel
};

module.exports = nextConfig;