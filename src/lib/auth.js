import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

// Fonction pour connecter à MongoDB
async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI, {
        tls: true,
        tlsInsecure: false,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 30000,
    });
    await client.connect();
    return { client, db: client.db('future_backoffice') };
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email et mot de passe requis');
                }

                try {
                    const { client, db } = await connectToDatabase();
                    const user = await db.collection('users').findOne({
                        email: credentials.email
                    });

                    // Fermer la connexion
                    await client.close();

                    if (!user) {
                        throw new Error('Aucun utilisateur trouvé avec cet email');
                    }

                    // Vérifier le mot de passe
                    const isValidPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isValidPassword) {
                        throw new Error('Mot de passe incorrect');
                    }

                    // Retourner l'utilisateur (sans le mot de passe)
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name || user.email
                    };
                } catch (error) {
                    console.error('Erreur d\'authentification:', error);
                    throw new Error(error.message || 'Erreur d\'authentification');
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 jours
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 jours
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login', // Rediriger les erreurs vers la page login
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};