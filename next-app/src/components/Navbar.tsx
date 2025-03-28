'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/store/auth';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogin = () => router.push('/login');

  const handleLogout = async () => {
    await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  
    useAuth.getState().logout();
    useAuth.getState().setToken(null); // 👉 accessToken도 제거
    router.replace('/');
  };
  

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 w-full z-40 transition-all',
        scrolled
          ? 'backdrop-blur-lg bg-background/70 border-b border-foreground/10 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">OHJ Company</h1>

        <nav className="hidden md:flex space-x-8 text-sm items-center">
          <a href="#services" className="text-foreground/80 hover:text-foreground transition">서비스</a>
          <a href="#about" className="text-foreground/80 hover:text-foreground transition">회사소개</a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition">문의</a>

          {token ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 border border-foreground text-foreground rounded hover:bg-foreground hover:text-background transition"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="ml-4 px-4 py-2 bg-foreground text-background rounded hover:opacity-80 transition"
            >
              로그인
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
