const { MongoClient } = require('mongodb');
require('dotenv').config();

async function createContacts() {
    const client = new MongoClient(process.env.MONGODB_URI, {
        tls: true,
        tlsInsecure: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
    });

    try {
        console.log('Connexion à MongoDB...');
        await client.connect();
        console.log('Connecté avec succès !');
        const db = client.db();

        // Vérifier si la collection existe déjà
        const collections = await db.listCollections({ name: 'contacts' }).toArray();
        if (collections.length > 0) {
            console.log('La collection contacts existe déjà');
        } else {
            console.log('Création de la collection contacts...');
            await db.createCollection('contacts');
            console.log('Collection contacts créée');
        }

        // Données de test
        const contacts = [
            {
                fullName: 'Jean Dupont',
                email: 'jean.dupont@example.com',
                phoneNumber: '0612345678',
                message: 'Bonjour, je souhaite obtenir des informations sur vos formations.',
                studyLevel: 'Bac+3',
                type: 'consultation',
                status: 'pending',
                createdAt: new Date()
            },
            {
                fullName: 'Marie Martin',
                email: 'marie.martin@example.com',
                phoneNumber: '0698765432',
                message: 'Je voudrais prendre rendez-vous pour une consultation.',
                studyLevel: 'Bac+5',
                type: 'consultation',
                status: 'pending',
                createdAt: new Date(Date.now() - 86400000) // Hier
            },
            {
                fullName: 'Pierre Durand',
                email: 'pierre.durand@example.com',
                phoneNumber: '0687654321',
                message: 'Question générale sur vos services.',
                type: 'contact',
                status: 'pending',
                createdAt: new Date(Date.now() - 172800000) // Avant-hier
            }
        ];

        // Insérer les contacts
        const result = await db.collection('contacts').insertMany(contacts);
        console.log(`${result.insertedCount} contacts insérés avec succès`);

    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await client.close();
    }
}

createContacts();