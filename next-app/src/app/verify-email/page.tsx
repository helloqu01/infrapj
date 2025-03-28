// src/app/verify-email/page.tsx

import { Suspense } from 'react';
import VerifyEmailPage from '@/components/VerifyEmailPage';

export default function Page() {
  return (
    <Suspense fallback={<p>이메일 인증 중...</p>}>
      <VerifyEmailPage />
    </Suspense>
  );
}
