import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap globalement
import { Inter } from 'next/font/google';
import '../styles/custom.css';
import SessionProvider from '@/components/SessionProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Future Backoffice',
    description: 'Administration des contacts clients',
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
        <body className={inter.className}>
        <SessionProvider>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}