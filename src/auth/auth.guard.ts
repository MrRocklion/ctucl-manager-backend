import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    // Si el token está en la cookie, muévelo al header Authorization
    if (request.cookies?.token) {
      request.headers.authorization = `Bearer ${request.cookies.token}`;
    }

    return super.canActivate(context);
  }
}
