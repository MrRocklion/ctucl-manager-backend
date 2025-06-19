import { Module } from '@nestjs/common';
import { BusLineService } from './bus-line.service';
import { BusLineController } from './bus-line.controller';

@Module({
  controllers: [BusLineController],
  providers: [BusLineService],
})
export class BusLineModule {}
