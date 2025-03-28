import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'), // ✅ 여기서 주입받음
    });
    console.log('✅ JWT 전략 설정됨:', configService.get<string>('JWT_ACCESS_SECRET'));

  }

  async validate(payload: any) {
    console.log('🔥 JWT payload:', payload); // ✅ 이거 안 찍히면 verify 실패!
    return payload;
  }
}