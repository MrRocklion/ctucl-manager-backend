import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { AppConfigModule } from 'src/config/config.module';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports:[AppConfigModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthGuard,PrismaService],
  exports:[AuthService,FirebaseAuthGuard]
})
export class AuthModule {}
