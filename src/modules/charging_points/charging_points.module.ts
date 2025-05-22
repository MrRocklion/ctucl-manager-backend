import { Module } from '@nestjs/common';
import { ChargingPointsService } from './charging_points.service';
import { ChargingPointsController } from './charging_points.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingPoint } from 'src/database/entities/charging-point.entity';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([ChargingPoint])],
  controllers: [ChargingPointsController],
  providers: [ChargingPointsService],
})
export class ChargingPointsModule {}
