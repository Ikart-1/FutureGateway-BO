const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
    console.log('URI MongoDB:', process.env.MONGODB_URI ? 'Défini' : 'Non défini');

    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI n\'est pas défini dans le fichier .env');
        return;
    }

    const client = new MongoClient(process.env.MONGODB_URI, {
        tls: true,
        tlsInsecure: false,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 30000,
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority'
    });

    try {
        console.log('Tentative de connexion à MongoDB Atlas...');
        await client.connect();
        console.log('✅ Connexion réussie !');

        // Test d'une opération simple
        const db = client.db();
        const collections = await db.listCollections().toArray();
        console.log('✅ Base de données accessible');
        console.log('Collections existantes:', collections.map(c => c.name));

    } catch (error) {
        console.error('❌ Erreur de connexion:', error.message);

        // Diagnostics supplémentaires
        if (error.message.includes('SSL')) {
            console.log('\n🔍 Solutions possibles pour les erreurs SSL:');
            console.log('1. Vérifiez que votre adresse IP est autorisée dans MongoDB Atlas');
            console.log('2. Assurez-vous que le nom d\'utilisateur et mot de passe sont corrects');
            console.log('3. Vérifiez que le cluster MongoDB Atlas est actif');
        }
    } finally {
        await client.close();
        console.log('Connexion fermée');
    }
}

testConnection();