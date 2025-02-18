import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { ChargingPointsModule } from './charging_points/charging_points.module';
import { UsersModule } from './users/users.module';
import { BusStationModule } from './bus_station/bus_station.module';

@Module({
  imports: [
    AppConfigModule, // Importa el módulo de configuración
    AuthModule,
    ChargingPointsModule,
    UsersModule,
    BusStationModule
  ],
})
export class AppModule {}