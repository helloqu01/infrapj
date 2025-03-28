import { AuthGuard, AdminGuard } from '@/components/AuthGuard';

export default function AdminPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AdminGuard>{children}</AdminGuard>
    </AuthGuard>
  );
}
