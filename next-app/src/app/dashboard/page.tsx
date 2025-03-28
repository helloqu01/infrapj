'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';

export default function DashboardPage() {
  const { token, user, loadToken, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  useEffect(() => {
    if (token === null) {
      router.replace('/login');
    }
  }, [token, router]);

  return (
    <main className="p-10 text-foreground space-y-4">
      {!user ? (
        <p className="text-foreground/60">🔄 사용자 정보 불러오는 중...</p>
      ) : (
        <>
          <p className="text-green-600">✅ 로그인됨</p>
          <p>👤 <strong>이름:</strong> {user.name}</p>
          <p>📧 <strong>이메일:</strong> {user.email}</p>
          {user.role && <p>🛡️ <strong>권한:</strong> {user.role}</p>}

          <pre className="bg-foreground/5 p-4 mt-4 rounded text-sm text-foreground/80">
            Zustand 상태 출력: {'\n'}
            {JSON.stringify(user, null, 2)}
          </pre>

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
