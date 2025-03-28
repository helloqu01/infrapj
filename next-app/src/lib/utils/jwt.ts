import {jwtDecode} from 'jwt-decode';

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // ms 단위로 비교
  } catch {
    return true; // 디코드 실패한 토큰은 무조건 만료 처리
  }
}
