'use client';
import { signOut } from 'next-auth/react';

export default function Navbar() {
    return (
        <nav className="navbar navbar-light bg-primary shadow-sm fixed-top">
            <div className="container-fluid d-flex justify-content-between align-items-center px-3 px-lg-4 py-2 ">
                <img
                    src="/images/logo2.png"
                    alt="Logo Future"
                    height={40}
                    className="ms-5"
                    style={{ objectFit: 'contain' }}
                />

                <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => signOut()}
                >
                    Déconnexion
                </button>
            </div>
        </nav>
    );
}
