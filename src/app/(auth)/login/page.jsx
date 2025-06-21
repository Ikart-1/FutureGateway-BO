'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: '/dashboard/contacts'
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push('/dashboard/contacts');
        }
    };


    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-secondary">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <img
                        src="/images/logo.png"
                        alt="Logo Future"
                        height={100}
                        className="mb-2"
                        style={{ objectFit: 'contain' }}
                    />
                </div>                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} method="POST">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-light w-100">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}
