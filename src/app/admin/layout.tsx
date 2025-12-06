import AdminNavbar from '@/components/admin/Navbar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <AdminNavbar />
      <main className="p-6">{children}</main>
    </div>
  );
}

