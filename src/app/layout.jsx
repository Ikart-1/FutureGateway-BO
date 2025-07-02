import { Inter } from 'next/font/google';
import '../styles/globals.css'
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
        <body>
        {children}
        <Toaster />
        </body>
        </html>
    );
}
