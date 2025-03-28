import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token이 없습니다.');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET, // ✅ 별도의 refresh 시크릿 키 사용
      });

      request.user = decoded; // 이후 controller에서 req.user로 접근 가능
      return true;
    } catch (e) {
      throw new UnauthorizedException('Refresh token이 유효하지 않습니다.');
    }
  }
}
