'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function AdminLogin() {
    const supabase = createClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Errore durante il login');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg">
            <div className="max-w-md w-full p-8 bg-bg-card border border-white/5 rounded-sm">
                <h1 className="text-2xl font-display text-white mb-6 text-center">Admin Access</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-text-subtle mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-bg border border-white/10 p-3 text-white focus:border-accent focus:outline-none rounded-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-text-subtle mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-bg border border-white/10 p-3 text-white focus:border-accent focus:outline-none rounded-sm"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                        {loading ? 'Accedi...' : 'Accedi'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
