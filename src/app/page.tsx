import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to default locale - middleware will handle the rest
  redirect('/nb');
}
