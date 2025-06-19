import { Controller } from '@nestjs/common';
import { BusLineService } from './bus-line.service';

@Controller('bus-line')
export class BusLineController {
  constructor(private readonly busLineService: BusLineService) {}
}
