import { authOptions } from '@/lib/auth'; // Doit correspondre à l'export
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };