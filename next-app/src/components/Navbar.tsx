'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { Menu} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
    useAuth.getState().setToken(null);
    router.replace('/');
  };

  const navItems = (
    <>
      <Link href="#services" className="hover:text-foreground/90">서비스</Link>
      <Link href="#about" className="hover:text-foreground/90">회사소개</Link>
      <Link href="#contact" className="hover:text-foreground/90">문의</Link>
      {token ? (
        <Button variant="outline" onClick={handleLogout}>
          로그아웃
        </Button>
      ) : (
        <Button onClick={handleLogin}>
          로그인
        </Button>
      )}
    </>
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all ${scrolled ? 'backdrop-blur bg-background/70 border-b border-border' : ''}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-foreground">
          OHJ Company
        </Link>

        {/* 데스크탑 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm text-foreground/80">
          {navItems}
        </nav>

        {/* 모바일 메뉴 */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-4 mt-8 text-sm">
                {navItems}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
