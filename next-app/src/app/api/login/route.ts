// src/app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 가짜 사용자 검증
  if (email === 'admin@example.com' && password === '1234') {
    const token = 'mocked-jwt-token'; // 실제 서비스라면 JWT 발급
    return NextResponse.json({ token }, { status: 200 });
  }

  return NextResponse.json({ message: '로그인 실패' }, { status: 401 });
}
