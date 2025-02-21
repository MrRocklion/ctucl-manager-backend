import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppConfigService } from 'src/config/config.service';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;

  constructor(private readonly configService: AppConfigService) {
    console.log(configService.mqtt_vars)
    this.client = mqtt.connect(`mqtts://${configService.mqtt_vars.broker}:${configService.mqtt_vars.port}`, {
      username: configService.mqtt_vars.username,
      password: configService.mqtt_vars.password,
      rejectUnauthorized: false,
    });

    this.client.on('connect', () => {
      console.log('🔗 Conectado al broker MQTT');
    });

    this.client.on('error', (error) => {
      console.error('❌ Error en la conexión MQTT:', error);
    });
  }

  publish(topic: string, message: any) {
    const payload = JSON.stringify(message);

    return new Promise((resolve, reject) => {
      this.client.publish(topic, payload, { qos: 1 }, (err) => {
        if (err) {
          console.error('❌ Error publicando en MQTT:', err);
          reject(err);
        } else {
          console.log(`📡 Mensaje publicado en ${topic}:`, payload);
          resolve(true);
        }
      });
    });
  }

  onModuleDestroy() {
    this.client.end();
  }

  onModuleInit() {
    console.log('✅ MqttService inicializado');
  }
}
