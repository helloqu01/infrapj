'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import { getMe } from '@/lib/api/auth';
import { isTokenExpired } from '@/lib/utils/jwt';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, user, setToken, setUser, loadToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }

    if (isTokenExpired(token)) {
      setToken(null);
      setUser(null);
      router.replace('/login');
      return;
    }

    if (!user) {
      getMe(token)
        .then(setUser)
        .catch(() => {
          setToken(null);
          setUser(null);
          router.replace('/login');
        });
    }
  }, [token]);

  if (!token || !user) return null; // 로딩 중

  return <>{children}</>;
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      router.replace('/not-authorized');
    }
  }, [user]);

  if (!user || user.role !== 'ADMIN') return null;

  return <>{children}</>;
}
