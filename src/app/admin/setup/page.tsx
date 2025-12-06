'use client';

import Link from 'next/link';

export default function SetupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <h1 className="mb-2 text-3xl font-bold text-white">Admin Setup Disabled</h1>
          <p className="mb-8 text-slate-400">
            Admin user creation is restricted for security. Admin users must be created manually in
            Supabase Dashboard.
          </p>

          <div className="space-y-6">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="mb-3 text-sm font-medium text-amber-300">
                To create an admin user, follow these steps:
              </p>
              <ol className="ml-4 list-decimal space-y-2 text-sm text-amber-200">
                <li>Go to Supabase Dashboard → Authentication → Users</li>
                <li>Click &quot;Add user&quot; and create the user</li>
                <li>Copy the user&apos;s UUID</li>
                <li>Go to SQL Editor and run the SQL below</li>
              </ol>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-300">SQL Instructions</h3>
              <p className="mb-2 text-xs text-slate-400">
                After creating a user in Supabase Auth, run this SQL:
              </p>
              <code className="block rounded bg-slate-900 p-3 text-xs text-slate-300">
                -- Get user ID (replace with your email)
                <br />
                SELECT id, email FROM auth.users WHERE email = &apos;kontakt@huslampe.no&apos;;
                <br />
                <br />
                -- Add to admin_users (replace user-id-here with ID from above)
                <br />
                INSERT INTO admin_users (id, email, role, is_active)
                <br />
                VALUES (&apos;user-id-here&apos;, &apos;kontakt@huslampe.no&apos;, &apos;admin&apos;,
                true);
              </code>
            </div>

            <div className="text-center">
              <Link
                href="/admin/login"
                className="inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-500"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
