import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Contact from '@/lib/models/Contact';
import dbConnect from '@/lib/db';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify([]), { status: 200 });    }

    await dbConnect();

    try {
        const contacts = await Contact.find({ status: 'pending' }).sort({ createdAt: -1 });
        return new Response(JSON.stringify(contacts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching contacts' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Validation des données requises selon le modèle Contact
        const requiredFields = ['fullName', 'email', 'phoneNumber', 'message', 'type'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            return new Response(JSON.stringify({
                error: 'Missing required fields',
                missingFields
            }), { status: 400 });
        }

        // Création du nouveau contact selon le modèle exact
        const newContact = await Contact.create({
            fullName: body.fullName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            message: body.message,
            studyLevel: body.studyLevel || undefined, // non requis
            type: body.type, // doit être 'contact' ou 'consultation'
            status: 'pending' // valeur par défaut
            // createdAt est ajouté automatiquement
        });

        return new Response(JSON.stringify(newContact), { status: 201 });

    } catch (error) {
        console.error('Error creating contact:', error);
        return new Response(JSON.stringify({
            error: 'Error creating contact',
            details: error.message,
            validationErrors: error.errors // si erreur de validation Mongoose
        }), { status: 500 });
    }
}