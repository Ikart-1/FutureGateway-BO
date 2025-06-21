'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react'; // Importez useState

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Déclarez l'état isOpen

    return (
        <>
            <button
                className="d-lg-none btn btn-light position-fixed  start-0 mt-3 m-2"
                style={{ zIndex: 1100 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>
            <div
                className={`sidebar bg-secondary border-end vh-100 position-lg-fixed ${isOpen ? 'd-block' : 'd-none d-lg-block'}`}
                style={{
                    width: '260px',
                    top: 0,
                    left: 0,
                    zIndex: 1000
                }}
            >
                <div className="d-flex flex-column p-4 h-100 text-secondary">
                    <div className="mb-4" style={{ height: '56px' }}></div>
                    <nav className="nav flex-column">
                        <Link
                            href="/dashboard/contacts"
                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${
                                pathname.includes('/dashboard/contacts')
                                    ? 'active bg-light text-primary fw-semibold'
                                    : 'text-dark'
                            }`}
                        >
                            <svg
                                className="me-2"
                                style={{ width: '20px', height: '20px' }}
                                fill="none"
                                stroke="#0b3e67"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            Contacts
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}