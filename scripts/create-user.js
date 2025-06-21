const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createUser() {
    const client = new MongoClient(process.env.MONGODB_URI, {
        tls: true,
        tlsInsecure: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
    });

    try {
        console.log('Tentative de connexion à MongoDB...');
        await client.connect();
        console.log('Connexion réussie !');
        const db = client.db();

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash('password123', 12);

        // Créer l'utilisateur
        const user = {
            email: 'test@example.com',
            password: hashedPassword,
            name: 'Utilisateur Test',
            createdAt: new Date()
        };

        const result = await db.collection('users').insertOne(user);
        console.log('Utilisateur créé avec succès:', result.insertedId);
        console.log('Email: test@example.com');
        console.log('Mot de passe: password123');

    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await client.close();
    }
}

createUser();