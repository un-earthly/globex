'use client';

export default function AuthLayout({ children }) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            {children}
        </main>
    )
}