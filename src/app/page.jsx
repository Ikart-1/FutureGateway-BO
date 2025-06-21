import Link from 'next/link';

export default function Home() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center min-vh-100 p-3 text-white"
            style={{
                backgroundImage: `
                    linear-gradient(to bottom, rgba(11, 62, 103, 0.8), rgba(240, 87, 34, 0.9)),
                    url('/images/heroimg.png')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <h1 className="mb-4 text-center">Future Gateway Backoffice</h1>
            <div>
                <Link
                    href="/login"
                    className="btn btn-light"
                >
                    Se connecter
                </Link>
            </div>
        </div>
    );
}
