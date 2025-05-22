import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Authorization token missing');
    }

    const token = authorization.replace('Bearer ', '');
    const user = await this.authService.verifyToken(token);
    request.user = user;

    return true;
  }
}
