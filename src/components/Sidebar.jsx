'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="lg:hidden fixed top-3 left-2 z-50 p-2 rounded-md text-white bg-primary shadow-sm "
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div
                className={`fixed lg:static inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out z-40 w-64 bg-white border-r border-gray-200`}
            >
                <div className="flex flex-col h-full p-4 ">
                    <div className="inline-flex items-center justify-center">
                        <img
                            src="/images/logo.png"
                            alt="Mini Logo"
                            className="h-[60px] w-auto max-w-none" // 6px de haut
                            style={{
                                imageRendering: 'crisp-edges', // Pour une meilleure netteté
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                    <nav className="space-y-1 mt-6 ">
                        <Link
                            href="/dashboard/contacts"
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                pathname.includes('/dashboard/contacts')
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <svg
                                className="mr-3 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
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