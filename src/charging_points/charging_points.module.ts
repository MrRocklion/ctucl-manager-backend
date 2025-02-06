import { Module } from '@nestjs/common';
import { ChargingPointsService } from './charging_points.service';
import { ChargingPointsController } from './charging_points.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChargingPointsController],
  providers: [ChargingPointsService,PrismaService],
})
export class ChargingPointsModule {}
