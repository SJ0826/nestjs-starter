import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { // Reflector: 커스텀 데코레이터의 메타데이터를 읽어오는 유틸리티
  }

  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const roles = this.reflector.get(Roles, context.getHandler())
    if(!roles) { // roles가 없으면 접근 허용 (공개 API)
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}