import { Module } from '@nestjs/common';
import { BusStationController } from './bus_station.controller';
import { BusStationService } from './bus_station.service';
import { MqttModule } from 'src/modules/mqtt/mqtt.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttCommandHistory } from 'src/database/entities/mqtt-command-history.entity';



@Module({
  imports:[MqttModule,AuthModule,TypeOrmModule.forFeature([MqttCommandHistory])],
  controllers: [BusStationController],
  providers: [BusStationService]
})
export class BusStationModule {}
