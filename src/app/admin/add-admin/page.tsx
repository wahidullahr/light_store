'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdminClient } from '@/lib/admin/auth';

export default function AddAdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const admin = await isAdminClient();
      setIsAuthorized(admin);
      setChecking(false);
      if (!admin) {
        router.push('/admin/login');
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('/api/admin/add-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      } else {
        setError(result.error || 'Failed to add admin user');
        setLoading(false);
      }
    } catch (error) {
      setError('Failed to add admin user. Please try again.');
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-white">Checking authorization...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-red-500/20 bg-slate-900 p-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-white">Access Denied</h1>
            <p className="mb-4 text-slate-400">
              Only existing admins can add new admin users.
            </p>
            <Link
              href="/admin/login"
              className="inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-500"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-green-500/20 bg-slate-900 p-8 text-center">
            <div className="mb-4 text-4xl">✅</div>
            <h1 className="mb-2 text-2xl font-bold text-white">Admin User Added!</h1>
            <p className="mb-4 text-slate-400">
              The user {email} has been added to the admin_users table.
            </p>
            <p className="mb-4 text-sm text-slate-500">
              They can now log in at the login page.
            </p>
            <Link
              href="/admin/login"
              className="inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-500"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <h1 className="mb-2 text-3xl font-bold text-white">Add Admin User</h1>
          <p className="mb-8 text-slate-400">
            Add an existing Supabase Auth user to the admin_users table
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                User Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="user@huslampe.no"
              />
              <p className="mt-2 text-xs text-slate-500">
                Enter the email of a user that already exists in Supabase Auth
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding admin user...' : 'Add Admin User'}
            </button>

            <div className="text-center">
              <Link href="/admin/login" className="text-sm text-slate-400 hover:text-white">
                Back to Login
              </Link>
            </div>
          </form>

          <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-300">Alternative: Use SQL</h3>
            <p className="mb-2 text-xs text-slate-400">
              You can also add the user directly via SQL in Supabase:
            </p>
            <code className="block rounded bg-slate-900 p-2 text-xs text-slate-300">
              SELECT id, email FROM auth.users WHERE email = &apos;{email || 'user@example.com'}&apos; LIMIT
              1;
              <br />
              <br />
              INSERT INTO admin_users (id, email, role, is_active)
              <br />
              VALUES (&apos;user-id-from-above&apos;, &apos;{email || 'user@example.com'}&apos;, &apos;admin&apos;, true);
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

