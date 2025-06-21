import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Contact from '@/lib/models/Contact';
import dbConnect from '@/lib/db';


export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = params;

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    await dbConnect();

    try {
        await Contact.findByIdAndUpdate(id, { status: 'completed' });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error updating contact' }), { status: 500 });
    }
}