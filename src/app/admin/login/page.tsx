'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInAdmin } from '@/lib/admin/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signInAdmin(email, password);

      if (result.success) {
        // Small delay for smooth transition
        await new Promise((resolve) => setTimeout(resolve, 300));
        router.push('/admin');
        router.refresh();
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">Huslampe</h1>
          <p className="text-slate-400">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Sign In</h2>
            <p className="mt-2 text-sm text-slate-400">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all duration-200 focus:border-amber-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="kontakt@huslampe.no"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all duration-200 focus:border-amber-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <div className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="font-medium">{error}</p>
                    {error.includes('admin_users') && (
                      <div className="mt-2 space-y-1 text-xs text-red-300">
                        <p>Quick checks:</p>
                        <ol className="ml-4 list-decimal space-y-0.5">
                          <li>Verify user exists in admin_users table</li>
                          <li>Check that is_active = true</li>
                          <li>Verify RLS policy exists (see DIAGNOSE_ADMIN_ISSUE.md)</li>
                          <li>Check browser console (F12) for detailed errors</li>
                        </ol>
                        <p className="mt-2 font-medium">
                          See DIAGNOSE_ADMIN_ISSUE.md for step-by-step troubleshooting
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 transition-all duration-200 hover:from-amber-500 hover:to-amber-400 hover:shadow-xl hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-amber-600 disabled:hover:to-amber-500"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 border-t border-slate-800 pt-6">
            <p className="text-center text-xs text-slate-500">
              Secure admin access for authorized personnel only
            </p>
          </div>
        </div>

        {/* Back to site link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
