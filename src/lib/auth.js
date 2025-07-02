import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/User";
import dbConnect from "@/lib/db";
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    await dbConnect();
                    console.log('Tentative de connexion avec:', credentials.email);
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        console.log('Utilisateur non trouvé');
                        return null;
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) {
                        console.log('Mot de passe incorrect');
                        return null;
                    }
                    if (isValid) {
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            name: user.name,
                            role: user.role
                        };
                    }
                    return null;
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 jours
    },
    secret: process.env.NEXTAUTH_SECRET,
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                path: '/',
                sameSite: 'lax',
                httpOnly: true,
                secure: true,
            },
        },
    },
    events: {
        signOut: () => {
            console.log('Déconnexion effectuée');
        }
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Gère correctement les redirections relatives/absolues
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            return url;
        }
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
        error: "/auth/login",
        newUser: null // Désactive la page de nouveau compte
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
export const auth = () => NextAuth(authOptions);