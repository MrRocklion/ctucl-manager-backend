import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule], // Permite acceso a variables de entorno
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.crypto.jwt.secret, // Obtener el secreto desde .env
        signOptions: { expiresIn: configService.crypto.jwt.expiration }, // Expiración desde .env
      }),
      inject: [AppConfigService],
    }),
    AppConfigModule
  ],
  
  providers: [AuthService,UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
