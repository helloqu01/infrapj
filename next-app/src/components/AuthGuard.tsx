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
  }, [loadToken]);

  useEffect(() => {
    const validateUser = async () => {
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
        try {
          const data = await getMe();
          setUser(data);
        } catch {
          setToken(null);
          setUser(null);
          router.replace('/login');
        }
      }
    };

    validateUser();
  }, [token, user, setToken, setUser, router]);

  if (!token || !user) return null;

  return <>{children}</>;
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      router.replace('/not-authorized');
    }
  }, [user, router]);

  if (!user || user.role !== 'ADMIN') return null;

  return <>{children}</>;
}
