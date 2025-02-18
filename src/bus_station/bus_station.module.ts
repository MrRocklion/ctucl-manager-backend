import { Module } from '@nestjs/common';
import { BusStationController } from './bus_station.controller';
import { BusStationService } from './bus_station.service';

@Module({
  controllers: [BusStationController],
  providers: [BusStationService]
})
export class BusStationModule {}
