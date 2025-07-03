import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Contact from '@/lib/models/Contact';
import dbConnect from '@/lib/db';

// Liste des origines autorisées
const allowedOrigins = [
    'http://localhost:3000', // Développement local
    'https://www.futuregatewayedu.com' // Remplacez par votre domaine de production
];

export async function GET(request) {
    const origin = request.headers.get('origin');

    // Vérification CORS pour GET
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin || '*'
            }
        });
    }

    await dbConnect();

    try {
        const contacts = await Contact.find({ status: 'pending' }).sort({ createdAt: -1 });
        return new Response(JSON.stringify(contacts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin || '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching contacts' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin || '*'
            }
        });
    }
}

export async function POST(request) {
    const origin = request.headers.get('origin');

    // Vérification CORS pour POST
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    try {
        await dbConnect();
        const body = await request.json();

        // Validation des données
        const requiredFields = ['fullName', 'email', 'phoneNumber', 'message', 'type'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            return new Response(JSON.stringify({
                error: 'Missing required fields',
                missingFields
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': origin || '*'
                }
            });
        }

        const newContact = await Contact.create({
            fullName: body.fullName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            message: body.message,
            studyLevel: body.studyLevel || undefined,
            type: body.type,
            status: 'pending'
        });

        return new Response(JSON.stringify(newContact), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin || '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });

    } catch (error) {
        console.error('Error creating contact:', error);
        return new Response(JSON.stringify({
            error: 'Error creating contact',
            details: error.message,
            validationErrors: error.errors
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin || '*'
            }
        });
    }
}

// Gestion des requêtes OPTIONS pour CORS
export async function OPTIONS() {
    const origin = request.headers.get('origin');

    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400' // Cache pour 24 heures
        }
    });
}