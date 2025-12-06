import { redirect } from 'next/navigation';

export default async function SetupPage() {
  redirect('/admin/login');
}

