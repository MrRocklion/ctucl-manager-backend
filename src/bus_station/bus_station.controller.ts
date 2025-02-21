import { Controller,UseGuards,Post,Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { MqttCommand } from './dto/bus-station-mqtt.dto';
import { BusStationService } from './bus_station.service';

@UseGuards(JwtAuthGuard)
@Controller('bus-station')
export class BusStationController {
    constructor(private readonly bus_station_service: BusStationService) {}
    @Post()
      create(@Body() mqttCommand:MqttCommand) {
        return this.bus_station_service.exectMqttCommand(mqttCommand)
    }
}
