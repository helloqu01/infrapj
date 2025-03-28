const API_URL = 'https://codingbyohj.com/api/auth';
// const API_URL = 'http://localhost:8080/api';

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('로그인 실패');
  return res.json();
};

export const register = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, password }),
  });

  if (!res.ok) throw new Error('회원가입 실패');
  return res.json();
};


export const getMe = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('사용자 정보 조회 실패');
  return res.json();
};

export const forgotPassword = async (email: string) => {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('비밀번호 재설정 요청 실패');
  return res.json();
};

export const resetPassword = async (token: string, newPassword: string) => {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });
  if (!res.ok) throw new Error('비밀번호 재설정 실패');
  return res.json();
};

export const verifyEmail = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/verify-email?token=${token}`);
  if (!res.ok) throw new Error('이메일 인증 실패');
  return res.json();
};

export const refreshToken = async () => {
  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    credentials: 'include', // ✅ 쿠키에서 refreshToken 사용
  });
  if (!res.ok) throw new Error('토큰 갱신 실패');
  return res.json(); // { accessToken }
};
