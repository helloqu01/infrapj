import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndMerge<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles || requiredRoles.length === 0) return true;
  
      const { user } = context.switchToHttp().getRequest();
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('권한이 없습니다');
      }
  
      return true;
    }
  }
  