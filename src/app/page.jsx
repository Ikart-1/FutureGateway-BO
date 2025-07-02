'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
    return (
        <div
            className="flex items-center justify-center min-h-screen text-white bg-cover bg-center bg-no-repeat bg-blend-overlay"
            style={{
                backgroundImage: `
          linear-gradient(to bottom right, rgba(11, 62, 103, 0.8), rgba(240, 87, 34, 0.9)),
          url('/images/heroimg.png')
        `
            }}
        >
            <div className="w-full max-w-md text-center p-8 bg-white/90 rounded-xl shadow-xl border border-gray-200">
                <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Future Gateway Backoffice</h1>
                <p className="text-gray-600 mb-6">Accédez à votre espace de gestion</p>

                <Link href="/login">
                    <Button className="w-full">Se connecter</Button>
                </Link>
            </div>
        </div>
    )
}
