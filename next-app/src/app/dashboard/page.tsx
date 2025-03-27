'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';

export default function DashboardPage() {
  const { token, loadToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    if (token === null) {
      router.replace('/login');
    }
  }, [token]);

  return (
    <main className="p-10 text-foreground">
      {token && <p className="text-green-600">✅ 로그인됨. 토큰: {token}</p>}
    </main>
  );
}
