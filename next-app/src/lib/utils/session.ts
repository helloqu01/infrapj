// lib/utils/session.ts
import { useAuth } from '@/store/auth';

export const handleSessionExpire = () => {
  useAuth.getState().logout(); // 상태 초기화
  alert('세션이 만료되었습니다. 다시 로그인해주세요.');
  window.location.href = '/login'; // 페이지 강제 이동
};
