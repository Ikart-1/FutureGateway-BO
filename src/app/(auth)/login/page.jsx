'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: 'Erreur de Validation',
                description: 'Veuillez remplir tous les champs.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/dashboard/contacts'
            });

            if (result?.error) {
                let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';

                if (result.error.includes('Unauthorized User')) {
                    errorMessage = 'Accès refusé. Seuls les administrateurs peuvent se connecter.';
                } else if (result.error.includes('User not found')) {
                    errorMessage = 'Utilisateur non trouvé. Vérifiez votre adresse email.';
                } else if (result.error.includes('Invalid credentials')) {
                    errorMessage = 'Email ou mot de passe invalide.';
                } else if (result.error.includes('Account locked')) {
                    errorMessage = 'Compte verrouillé temporairement. Réessayez plus tard.';
                } else {
                    errorMessage = result.error;
                }

                setError(errorMessage);

                toast({
                    title: 'Échec de la connexion',
                    description: errorMessage,
                    variant: 'destructive',
                });

            } else {
                toast({
                    title: 'Connexion réussie',
                    description: 'Bienvenue ! Vous avez été connecté avec succès.',
                });
                router.push('/dashboard/contacts');
            }

        } catch (error) {
            console.error('Erreur inattendue :', error);

            toast({
                title: 'Erreur serveur',
                description: 'Une erreur inattendue est survenue. Veuillez réessayer plus tard.',
                variant: 'destructive',
            });

        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
            <Card className="w-full max-w-md shadow-xl border-0">
                <CardHeader className="text-center pb-6">
                    <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Bon Retour</CardTitle>
                    <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="email"
                            id="email"
                            className="pl-10"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Entrez votre mot de passe"
                                className="pl-10 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Connexion en cours...
                            </>
                        ) : (
                            'Se Connecter'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
                <p className="text-xs text-gray-500">
                    Protégé par limitation de débit et verrouillage de compte
                </p>
            </CardFooter>
        </Card>
</div>
)
}
