'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import { getMe, register } from '@/lib/api/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser, token, loadToken } = useAuth();

  useEffect(() => {
    loadToken();
  }, [loadToken]); // ✅ 의존성 추가
  
  useEffect(() => {
    if (token) {
      router.replace('/dashboard');
    }
  }, [token, router]); // ✅ router 추가
  
  useEffect(() => {
    if (token) {
      getMe(token)
        .then(setUser)
        .catch(() => {
          console.warn('토큰 만료 또는 유효하지 않음');
        });
    }
  }, [token, setUser]); // ✅ setUser 추가
  

  const handleRegister = async () => {
    try {
      setLoading(true);
      await register({ email, name, password });
      alert('회원가입이 완료되었습니다. 이메일을 확인해주세요.');
      router.replace('/login');
    } catch (err) {
      alert('회원가입 실패: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-background border border-foreground/10 rounded-2xl shadow-xl p-8 space-y-6 transition-all">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-foreground">회원가입 ✨</h2>
        <p className="text-sm text-foreground/60">계정을 생성하고 서비스를 시작하세요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-sm text-foreground">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-foreground/10 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition"
          />
        </div>

        <div>
          <label htmlFor="name" className="block mb-1 text-sm text-foreground">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="홍길동"
            onChange={(e) => setName(e.target.value)}
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
        onClick={handleRegister}
        disabled={loading}
        className="w-full py-2 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition"
      >
        {loading ? '가입 중...' : '회원가입'}
      </button>
    </div>
  );
}
