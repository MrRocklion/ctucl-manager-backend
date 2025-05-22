import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChargingPointsModule } from './modules/charging_points/charging_points.module';
import { UsersModule } from './modules/users/users.module';
import { BusStationModule } from './modules/bus_station/bus_station.module';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AppConfigModule, // Importa el módulo de configuración
    AuthModule,
    ChargingPointsModule,
    UsersModule,
    BusStationModule,
    MqttModule,
    DatabaseModule
  ],
})
export class AppModule {}