// src/components/VerifyEmailPage.tsx

'use client';

import { useEffect, useState } from 'react';
import { verifyEmail } from '@/lib/api/auth';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      verifyEmail(token)
        .then(() => setStatus('success'))
        .catch(() => setStatus('error'));
    } else {
      setStatus('error');
    }
  }, [params]);

  return (
    <div className="p-10 text-center">
      {status === 'loading' && '인증 중...'}
      {status === 'success' && '✅ 이메일 인증 완료!'}
      {status === 'error' && '❌ 인증 실패 또는 만료된 링크'}
    </div>
  );
}
