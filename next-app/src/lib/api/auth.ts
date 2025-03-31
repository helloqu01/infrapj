// lib/api/auth.ts
import api from './axios';

// 로그인
export const login = async (email: string, password: string): Promise<{ accessToken: string }> => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

// 회원가입
export const register = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const res = await api.post('/auth/register', { email, name, password });
  return res.data;
};

// 현재 사용자 정보
export const getMe = async (): Promise<{ id: number; name: string; email: string }> => {
  const res = await api.get('/auth/me');
  return res.data;
};

// 이메일 인증
export const verifyEmail = async (token: string) => {
  const res = await api.get(`/auth/verify-email?token=${token}`);
  return res.data;
};

// 비밀번호 재설정 요청
export const forgotPassword = async (email: string) => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
};

// 비밀번호 재설정 실행
export const resetPassword = async (token: string, newPassword: string) => {
  const res = await api.post('/auth/reset-password', { token, newPassword });
  return res.data;
};

// 액세스 토큰 재발급
export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
  const res = await api.post('/auth/refresh-token');
  return res.data;
};

export const updateMe = async (data: { name?: string }) => {
  const res = await api.patch('/auth/me', data);
  return res.data;
};