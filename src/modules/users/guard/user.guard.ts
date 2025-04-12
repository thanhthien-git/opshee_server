import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayload } from '../../../interface/jwt-payload';

export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;
    const bodyUserId = request.body.userId || request.params.userId;
    
    if (!user || user.userId !== bodyUserId) {
      throw new ForbiddenException('Bạn không có quyền này');
    }

    return true;
  }
}
