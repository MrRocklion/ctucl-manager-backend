import { Module } from '@nestjs/common';
import { BusStationController } from './bus_station.controller';
import { BusStationService } from './bus_station.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports:[MqttModule],
  controllers: [BusStationController],
  providers: [BusStationService,PrismaService]
})
export class BusStationModule {}
