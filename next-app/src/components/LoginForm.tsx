'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { getMe, login, refreshAccessToken } from '@/lib/api/auth';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setUser, token, loadToken, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  useEffect(() => {
    const tryGetMe = async () => {
      if (token) {
        try {
          const user = await getMe();
          setUser(user);
          router.replace('/dashboard');
        } catch {
          try {
            const newToken = await refreshAccessToken();
            setToken(newToken.accessToken);
            const user = await getMe();
            setUser(user);
            router.replace('/dashboard');
          } catch {
            logout();
            router.replace('/login');
          }
        }
      }
    };

    tryGetMe();
  }, [token, setUser, setToken, logout, router]);

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      setToken(data.accessToken);

      const user = await getMe();
      setUser(user);

      router.replace('/dashboard');
    } catch (err) {
      alert('로그인 실패: ' + (err as Error).message);
    }
  };

  return (
    <div className="w-full max-w-md bg-background border border-foreground/10 rounded-2xl shadow-xl p-8 space-y-6 transition-all">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-foreground">환영합니다 👋</h2>
        <p className="text-sm text-foreground/60">계속하려면 로그인하세요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-sm text-foreground">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="admin@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-foreground/10 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm text-foreground">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="비밀번호 입력"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-foreground/10 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition"
          />
        </div>
      </div>

      <button
        onClick={handleLogin}
        className="w-full py-2 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition"
      >
        로그인
      </button>

      <p className="text-xs text-center text-foreground/50">
        아직 계정이 없으신가요?{' '}
        <Link href="/register" className="underline hover:text-foreground">
          회원가입
        </Link>
      </p>
    </div>
  );
}
