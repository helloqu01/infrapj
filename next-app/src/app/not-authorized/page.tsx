'use client';

import Link from 'next/link';

export default function NotAuthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 text-foreground">
      <h1 className="text-4xl font-bold mb-4">⛔ 접근이 제한되었습니다</h1>
      <p className="text-lg mb-6">이 페이지에 접근할 권한이 없습니다. 관리자에게 문의하세요.</p>
      <Link
        href="/"
        className="px-6 py-2 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
