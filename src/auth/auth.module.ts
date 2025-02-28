import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule], // Permite acceso a variables de entorno
      inject: [AppConfigService],
    }),
    AppConfigModule
  ],
  
  providers: [AuthService,UsersService,PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
