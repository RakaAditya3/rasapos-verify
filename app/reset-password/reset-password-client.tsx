'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordClient() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    if (!token || !email) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Link reset password tidak valid.</p>
            </div>
        );
    }

    const handleSubmit = async () => {
        if (password !== confirm) {
            setMessage('Password tidak sama.');
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        token,
                        password,
                        password_confirmation: confirm,
                    }),
                }
            );

            // ⬇️ AMAN: cek dulu content-type
            const contentType = res.headers.get('content-type');
            let data: any = null;

            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            }

            if (!res.ok) {
                throw new Error(data?.message || 'Gagal reset password');
            }

            setMessage(data?.message || 'Password berhasil direset.');
            setTimeout(() => router.push('/login'), 2000);

        } catch (err: any) {
            setMessage(err.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow">
                <h1 className="text-xl font-bold mb-4">Reset Password</h1>

                <input
                    type="password"
                    placeholder="Password baru"
                    className="w-full border p-2 mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Konfirmasi password"
                    className="w-full border p-2 mb-4 rounded"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                {message && (
                    <p className="text-sm mb-3 text-center text-red-600">
                        {message}
                    </p>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Memproses...' : 'Reset Password'}
                </button>
            </div>
        </div>
    );
}
