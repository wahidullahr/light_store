import { redirect } from 'next/navigation';

export default async function AddAdminPage() {
  redirect('/admin/login');
}

