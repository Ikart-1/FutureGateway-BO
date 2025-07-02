'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const handleSignOut = () => {
        // 1. Supprimer tous les cookies NextAuth
        const cookies = document.cookie.split("; ");

        cookies.forEach(cookie => {
            if (cookie.startsWith('next-auth.') || cookie.startsWith('__Secure-next-auth.')) {
                const [name] = cookie.split("=");
                document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            }
        });

        // 2. Supprimer tout le stockage local
        if (typeof window !== 'undefined') {
            localStorage.clear();
            sessionStorage.clear();
        }

        // 3. Supprimer le cache du service worker (si utilisé)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => registration.unregister());
            });
            caches.keys().then(keys => {
                keys.forEach(key => caches.delete(key));
            });
        }

        // 4. Rediriger vers la page d'accueil avec rechargement complet
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-light bg-primary shadow-sm fixed-top">
            <div className="container-fluid d-flex justify-content-between align-items-center px-3 px-lg-4 py-2">
                <img
                    src="/images/logo2.png"
                    alt="Logo Future"
                    height={40}
                    className="ms-5"
                    style={{ objectFit: 'contain' }}
                />

                <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleSignOut}
                >
                    Déconnexion
                </button>
            </div>
        </nav>
    );
}