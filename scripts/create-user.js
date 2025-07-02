// scripts/create-user.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import User from '../src/lib/models/User.js'; // Notez l'extension .js

async function createUser() {
    try {
        console.log('Tentative de connexion à MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connexion réussie !');

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email: 'admin@future.com' });
        if (existingUser) {
            console.log('L\'utilisateur admin existe déjà');
            return;
        }

        // Créer l'utilisateur
        const user = new User({
            email: 'admin@future.com',
            password: await bcrypt.hash('Ikart123', 12),
            name: 'Admin Future',
            role: 'admin'
        });

        await user.save();
        console.log('Utilisateur admin créé avec succès !');
        console.log('Email: admin@future.com');
        console.log('Mot de passe: Ikart123');

    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createUser();