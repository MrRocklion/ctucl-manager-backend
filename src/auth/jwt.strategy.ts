import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraer token del header
      ignoreExpiration: false, // No ignorar expiración
      secretOrKey: configService.crypto.jwt.secret, // Clave secreta del .env
    });
  }

  async validate(payload: any) {
    return { username: payload.username }; // Retorna datos del usuario autenticado
  }
}
