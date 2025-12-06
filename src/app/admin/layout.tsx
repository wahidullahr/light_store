import '../globals.css';
import AdminLayoutClient from './admin-layout-client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
