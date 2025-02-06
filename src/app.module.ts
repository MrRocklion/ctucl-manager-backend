import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { ChargingPointsModule } from './charging_points/charging_points.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AppConfigModule, // Importa el módulo de configuración
    AuthModule,
    ChargingPointsModule,
    UsersModule
  ],
})
export class AppModule {}