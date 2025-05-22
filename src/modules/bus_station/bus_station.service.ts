import { Injectable } from '@nestjs/common';
import { MqttCommand } from './dto/bus-station-mqtt.dto';
import { MqttService } from 'src/modules/mqtt/mqtt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MqttCommandHistory } from 'src/database/entities/mqtt-command-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusStationService {
  constructor(
    @InjectRepository(MqttCommandHistory)
    private readonly mqttCommandHistoryRepository: Repository<MqttCommandHistory>,  // Cambié el nombre a mqttCommandHistoryRepository
    private readonly mqttService: MqttService,
  ) {}

  // Método para ejecutar un comando MQTT y guardarlo en la base de datos
  async exectMqttCommand(mqttCommand: MqttCommand) {
    try {
      // Publicamos el comando en el broker MQTT
      const isPublished = await this.mqttService.publish(mqttCommand.topic, {
        command: mqttCommand.command,
        path: mqttCommand.path,
      });

      if (!isPublished) {
        throw new Error("Error al publicar el comando en MQTT.");
      }

      // Guardamos el comando MQTT en la base de datos usando el repositorio de TypeORM
      const newMqttCommandHistory = this.mqttCommandHistoryRepository.create({
        ...mqttCommand,  // Creamos la entidad usando los datos del comando
      });

      await this.mqttCommandHistoryRepository.save(newMqttCommandHistory); // Guardamos el nuevo registro

      return {
        message: "Petición realizada con éxito",
        status: 200,
        result: true,
      };
    } catch (error) {
      console.error("❌ Error en exectMqttCommand:", error);

      return {
        message: error instanceof Error ? error.message : "Error desconocido",
        status: 500,
        result: false,
      };
    }
  }

  // Método para obtener el historial de comandos MQTT
  async getMqttHistory(): Promise<any[]> {
    try {
      // Obtenemos todos los registros de la base de datos
      const db_data = await this.mqttCommandHistoryRepository.find();
      const convertedData = convertToEcuadorTime(db_data); // Convertimos la hora a la zona horaria de Ecuador
      const sortedData = convertedData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Ordenamos los datos por fecha
      return sortedData;
    } catch (error) {
      console.error("Error en getMqttHistory:", error);
      throw new Error("No se pudo obtener el historial MQTT");
    }
  }
}

// Función para convertir las fechas a la zona horaria de Ecuador (UTC -5)
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
