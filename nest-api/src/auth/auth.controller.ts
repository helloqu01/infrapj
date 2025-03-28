import {
    Controller,
    Post,
    Body,
    UnauthorizedException,
    UseGuards,
    Req,
    Get,
    ForbiddenException,
    Query,
    Res,
  } from '@nestjs/common';
  import { Response } from 'express'
  import { Request } from 'express';
  import * as bcrypt from 'bcrypt';
  import { AuthService } from './auth.service';
  import { JwtAuthGuard } from './jwt-auth.guard';
  import { PrismaService } from '../prisma/prisma.service';
  import { v4 as uuidv4 } from 'uuid';
  import { RolesGuard } from './roles.guard';
  import { Roles } from './user.decorator';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private authService: AuthService,
      private prisma: PrismaService,
    ) {}
  
    @Post('login')
    async login(
      @Body() body: { email: string; password: string },
      @Res({ passthrough: true }) res: Response
    ) {
      const result = await this.authService.login(body.email, body.password);
      if (!result) throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다');

      // ✅ refreshToken을 HttpOnly + Secure 쿠키로 설정
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true, // 개발 환경에서는 false로 해도 됨
        sameSite: 'strict',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      });

      return { accessToken: result.accessToken };
}
  
    @Post('register')
    async register(@Body() body: { email: string; name: string; password: string }) {
      const existing = await this.prisma.user.findUnique({ where: { email: body.email } });
      if (existing) throw new UnauthorizedException('이미 등록된 이메일입니다.');
  
      const hashed = await bcrypt.hash(body.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: hashed,
          role: 'USER',
          isEmailVerified: false,
          emailVerificationToken: uuidv4(),
        },
      });
  
      return { message: '회원가입 성공. 이메일을 확인하세요.', userId: user.id };
    }
  
    @Get('verify-email')
    async verifyEmail(@Query('token') token: string) {
      const user = await this.prisma.user.findFirst({ where: { emailVerificationToken: token } });
      if (!user) throw new UnauthorizedException('유효하지 않은 토큰입니다');
  
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          isEmailVerified: true,
          emailVerificationToken: null,
        } as Partial<{ isEmailVerified: boolean; emailVerificationToken: string | null }>,
      });
  
      return { message: '이메일 인증 완료' };
    }
  
    @Post('forgot-password')
    async forgotPassword(@Body() body: { email: string }) {
      const user = await this.prisma.user.findUnique({ where: { email: body.email } });
      if (!user) return { message: '해당 이메일로 등록된 계정이 없습니다' };
  
      const resetToken = uuidv4();
      await this.prisma.user.update({
        where: { id: user.id },
        data: { resetToken } as Partial<{ resetToken: string }>,
      });
  
      return { message: '비밀번호 재설정 링크가 전송되었습니다' };
    }
  
    @Post('reset-password')
    async resetPassword(@Body() body: { token: string; newPassword: string }) {
      const user = await this.prisma.user.findFirst({ where: { resetToken: body.token } });
      if (!user) throw new UnauthorizedException('유효하지 않은 토큰입니다');
  
      const hashed = await bcrypt.hash(body.newPassword, 10);
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashed,
          resetToken: null,
        } as Partial<{ password: string; resetToken: string | null }>,
      });
  
      return { message: '비밀번호가 변경되었습니다' };
    }
  
    @Post('refresh-token')
    async refreshToken(@Body() body: { token: string }) {
      try {
        const decoded = await this.authService.verifyToken(body.token);
        const newToken = await this.authService.issueToken({
          sub: decoded.sub,
          email: decoded.email,
          name: decoded.name,
        });
        return { token: newToken };
      } catch (e) {
        throw new UnauthorizedException('토큰이 유효하지 않습니다');
      }
    }
  
    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(
      @Req() req: Request,
      @Body() body: { oldPassword: string; newPassword: string },
    ) {
      const user = await this.prisma.user.findUnique({
        where: { id: req.user!.sub },
        select: {
          id: true,
          password: true,
        },
      });
  
      if (!user) throw new UnauthorizedException();
  
      const match = await bcrypt.compare(body.oldPassword, user.password);
      if (!match) throw new UnauthorizedException('기존 비밀번호가 틀렸습니다');
  
      const hashed = await bcrypt.hash(body.newPassword, 10);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: hashed } as Partial<{ password: string }>,
      });
  
      return { message: '비밀번호가 변경되었습니다' };
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req: Request) {
      const user = req.user as { email: string; name: string; sub: number };
      return {
        id: user.sub,
        email: user.email,
        name: user.name,
      };
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('admin')
    async adminOnly(@Req() req: Request) {
      const user = await this.prisma.user.findUnique({ where: { id: req.user!.sub } });
      return { message: `관리자 ${user?.name}님 환영합니다.` };
    }
  
    @Post('social-login')
    async socialLogin(@Body() body: { provider: 'google' | 'kakao'; accessToken: string }) {
      return { message: '소셜 로그인 처리 예정', provider: body.provider };
    }
  }