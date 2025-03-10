import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { AuthModule } from 'src/auth/auth.module';





@Module({
  imports:[AuthModule],
  controllers: [UsersController],
  providers: [UsersService,PrismaService],
  exports:[UsersService]
})
export class UsersModule {}
