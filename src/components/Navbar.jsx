'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const handleSignOut = () => {
        // Logout logic remains the same
        const cookies = document.cookie.split("; ");
        cookies.forEach(cookie => {
            if (cookie.startsWith('next-auth.') || cookie.startsWith('__Secure-next-auth.')) {
                const [name] = cookie.split("=");
                document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            }
        });

        if (typeof window !== 'undefined') {
            localStorage.clear();
            sessionStorage.clear();
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => registration.unregister());
            });
            caches.keys().then(keys => {
                keys.forEach(key => caches.delete(key));
            });
        }

        window.location.href = '/';
    };

    return (
        <nav className="fixed top-0 left-64 right-0 bg-transparent  z-30 transition-all duration-200 ease-in-out lg:left-64">
            <div className="flex justify-between items-center px-4 py-2">
                <div className="w-64 lg:w-0"></div> {/* Espace réservé pour l'alignement */}

                <div className="flex-1 flex justify-between items-center">
                    <div className="flex-1"></div> {/* Espace vide à gauche */}

                    <button
                        className="px-4 py-2 text-sm rounded-md border border-primary text-primary hover:bg-white hover:text-primary transition-colors"
                        onClick={handleSignOut}
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </nav>
    );
}