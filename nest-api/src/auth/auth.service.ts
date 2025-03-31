import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
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
  
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'), // 🔥 이 값
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'), // 🔥 이 값
      expiresIn: '7d',
    });
  
    return { accessToken, refreshToken };
  }
  
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'), // ✅ 안전하게 변경
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
      secret: this.config.get<string>('JWT_ACCESS_SECRET'), // ✅ 수정
      expiresIn: '15m',
    });
  }

  async updateUser(userId: number, data: { name?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  
  
}
