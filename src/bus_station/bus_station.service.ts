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
      await this.prismaService.mqtt_command_history.create({
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
  async getMqttHistory(): Promise<any[]> {
    try {
      const db_data:MqttCommand[] = await this.prismaService.mqtt_command_history.findMany();
      const convertedData = convertToEcuadorTime(db_data);
      const sortedData = convertedData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return sortedData;
    } catch (error) {
      console.error("Error en getMqttHistory:", error);
      throw new Error("No se pudo obtener el historial MQTT");
    }
  }
}

function convertToEcuadorTime(data: any[]) {
  return data.map(item => {
    // Convertir la fecha UTC a Ecuador (UTC-5)
    const utcDate = new Date(item.createdAt);
    const ecuadorDate = new Date(utcDate.setHours(utcDate.getHours() - 5)); // Resta 5 horas para UTC-5
    
    const formattedDate = ecuadorDate.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
    const formattedTime = ecuadorDate.toISOString().split('T')[1].split('.')[0]; // Hora en formato HH:mm:ss

    return {
      ...item,
      createdAt: ecuadorDate,  // Guardamos la fecha convertida
      date: formattedDate,     // Solo la fecha
      time: formattedTime      // Solo la hora
    };
  });
}
