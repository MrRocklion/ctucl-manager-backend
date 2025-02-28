import { Module } from '@nestjs/common';
import { ChargingPointsService } from './charging_points.service';
import { ChargingPointsController } from './charging_points.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [ChargingPointsController],
  providers: [ChargingPointsService,PrismaService],
})
export class ChargingPointsModule {}
