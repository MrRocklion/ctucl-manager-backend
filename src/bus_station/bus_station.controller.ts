import { Controller,UseGuards,Post,Body, Get,HttpStatus,HttpException  } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { MqttCommand } from './dto/bus-station-mqtt.dto';
import { BusStationService } from './bus_station.service';

@UseGuards(FirebaseAuthGuard)
@Controller('bus-station')
export class BusStationController {
    constructor(private readonly bus_station_service: BusStationService) {}
    @Post()
      create(@Body() mqttCommand:MqttCommand) {
        return this.bus_station_service.exectMqttCommand(mqttCommand)
    }
    @Get()
    async getData() {
      try {
        const history = await this.bus_station_service.getMqttHistory();
  
        return {
          success: true,
          message: "Historial MQTT obtenido correctamente",
          data: history,
        };
      } catch (error) {
        console.error("Error en getData:", error);
  
        throw new HttpException(
          {
            success: false,
            message: "No se pudo obtener el historial MQTT",
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
}
