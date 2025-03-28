'use client';

import { useEffect } from 'react';
import { useAuth } from '@/store/auth';

export default function AuthLoader() {
  const { loadToken } = useAuth();

  useEffect(() => {
    loadToken();
  }, [loadToken]); // ✅ 수정 완료

  return null;
}
