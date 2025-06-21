const { MongoClient } = require('mongodb');
require('dotenv').config();

async function checkContacts() {
    const client = new MongoClient(process.env.MONGODB_URI, {
        tls: true,
        tlsInsecure: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
    });

    try {
        await client.connect();
        const db = client.db();
        const contacts = await db.collection('contacts').find({}).toArray();

        console.log(`Nombre de contacts trouvés: ${contacts.length}`);
        console.log('Liste des contacts:');
        console.log(contacts);

    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await client.close();
    }
}

checkContacts();