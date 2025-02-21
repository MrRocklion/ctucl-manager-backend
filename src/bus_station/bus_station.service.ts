import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MqttCommand } from './dto/bus-station-mqtt.dto';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class BusStationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mqttService: MqttService
  ) {}

  async exectMqttCommand(mqttCommand: MqttCommand) {
    try {
      const isPublished = await this.mqttService.publish(mqttCommand.topic, {
        command: mqttCommand.command,
        path: mqttCommand.path
      });

      if (!isPublished) {
        throw new Error("Error al publicar el comando en MQTT.");
      }
      await this.prismaService.mqtt_commands.create({
        data:mqttCommand
      }

      )

      return {
        message: "Petición realizada con éxito",
        status: 200,
        result: true
      };
    } catch (error) {
      console.error("❌ Error en exectMqttCommand:", error);

      return {
        message: error instanceof Error ? error.message : "Error desconocido",
        status: 500,
        result: false
      };
    }
  }
}
