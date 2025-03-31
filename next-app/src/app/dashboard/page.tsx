'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import { updateMe } from '@/lib/api/auth';

export default function DashboardPage() {
  const { token, user, loadToken, logout, updateUser } = useAuth();
  const router = useRouter();
  const [newName, setNewName] = useState('');

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  useEffect(() => {
    if (token === null) {
      router.replace('/login');
    }
  }, [token, router]);

  const handleUpdateName = async () => {
    try {
      const updated = await updateMe({ name: newName });
      updateUser({ name: updated.name }); // 상태 업데이트
      setNewName('');
    } catch (e) {
      alert('이름 변경 실패');
    }
  };

  return (
    <main className="p-10 text-foreground space-y-4">
      {!user ? (
        <p className="text-foreground/60">🔄 사용자 정보 불러오는 중...</p>
      ) : (
        <>
          <p className="text-green-600">✅ 로그인됨</p>
          <p>👤 <strong>이름:</strong> {user.name}</p>
          <p>📧 <strong>이메일:</strong> {user.email}</p>

          <div className="mt-4">
            <input
              className="border px-2 py-1 rounded mr-2"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="새 이름 입력"
            />
            <button
              onClick={handleUpdateName}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              이름 변경
            </button>
          </div>

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
