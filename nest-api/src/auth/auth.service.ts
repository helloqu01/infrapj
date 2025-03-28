import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
    if (!user) return null;
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
  
    const payload = { sub: user.id, email: user.email, name: user.name };
  
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
  
    return { accessToken, refreshToken };
  }
  
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET, // ✅ 리프레시 전용 시크릿
      });
  
      const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } });
      if (!user) throw new UnauthorizedException('유저를 찾을 수 없습니다.');
  
      const newAccessToken = await this.jwtService.signAsync(
        { sub: user.id, email: user.email, name: user.name },
        { expiresIn: '15m' }, // 액세스 토큰 유효시간
      );
  
      return newAccessToken;
    } catch (e) {
      throw new UnauthorizedException('Refresh token 검증 실패');
    }
  }
  

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  async issueToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
  }
  
}
