const axios = require('axios');
require('dotenv').config();

async function testCreateContact() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/contacts';

    const testContacts = [
        {
            fullName: 'Jean Dupont',
            email: 'jean.dupont@example.com',
            phoneNumber: '0612345678',
            message: 'Demande de contact général',
            type: 'contact' // 'contact' ou 'consultation'
        },
        {
            fullName: 'Marie Martin',
            email: 'marie.martin@example.com',
            phoneNumber: '0698765432',
            message: 'Demande de consultation',
            type: 'consultation',
            studyLevel: 'Bac+5' // optionnel
        }
    ];

    for (const [index, contact] of testContacts.entries()) {
        try {
            console.log(`Envoi du contact #${index + 1}:`, JSON.stringify(contact, null, 2));
            const response = await axios.post(API_URL, contact);

            console.log(`✅ Succès (${response.status})`);
            console.log('Réponse:', JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error(`❌ Erreur pour le contact #${index + 1}:`);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            } else {
                console.error('Error:', error.message);
            }
        }
        console.log('-------------------');
    }
}

testCreateContact();