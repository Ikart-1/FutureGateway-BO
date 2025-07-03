import { NextResponse } from 'next/server';

export function middleware(request) {
    // Domaines autorisés - REMPLACEZ '*' par des domaines spécifiques
    const allowedOrigins = [
        'https://www.futuregatewayedu.com',
        'https://futuregatewayedu.com',
        'http://localhost:3000',
        'http://localhost:3001'
    ];

    const origin = request.headers.get('origin');
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Gestion des requêtes OPTIONS (preflight CORS)
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, X-Requested-With',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Max-Age': '86400', // Cache preflight pour 24h
            },
        });
    }

    // Pour toutes les autres requêtes
    const response = NextResponse.next();

    // Ajouter les headers CORS seulement si l'origine est autorisée
    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
        response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    return response;
}

// Spécifier les routes où le middleware doit s'appliquer
export const config = {
    matcher: [
        '/api/:path*',
        // Vous pouvez ajouter d'autres routes si nécessaire
    ],
};