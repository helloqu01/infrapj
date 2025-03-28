'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';

export default function DashboardPage() {
  const { token, user, loadToken, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, [loadToken]); // ✅ 수정됨

  useEffect(() => {
    if (token === null) {
      router.replace('/login');
    }
  }, [token, router]); // ✅ 수정됨

  return (
    <main className="p-10 text-foreground space-y-4">
      {token && user && (
        <>
          <p className="text-green-600">✅ 로그인됨</p>
          <p>👤 이름: {user.name}</p>
          <p>📧 이메일: {user.email}</p>
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        </>
      )}
    </main>
  );
}
