import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { AppConfigService } from 'src/config/config.service';

@Module({
  providers: [MqttService,AppConfigService],
  exports: [MqttService],
})
export class MqttModule {}
