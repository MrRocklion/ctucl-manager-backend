import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { ChargingPointsService } from './charging_points.service';
import { CreateChargingPointDto } from './dto/create-charging_point.dto';
import { UpdateChargingPointDto } from './dto/update-charging_point.dto';
import { FirebaseAuthGuard } from 'src/modules/auth/firebase-auth.guard';



@UseGuards(FirebaseAuthGuard)
@Controller('charging-points')
export class ChargingPointsController {
  constructor(private readonly chargingPointsService: ChargingPointsService) {}
  
  @Post()
  create(@Body() createChargingPointDto: CreateChargingPointDto) {
    return this.chargingPointsService.create(createChargingPointDto);
  }

  @Get()
  findAll() {
    return this.chargingPointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chargingPointsService.findOne(+id);
  }


  @Patch(':id/deactivate')
  remove(@Param('id') id: string) {
    return this.chargingPointsService.softDelete(+id);
  }
  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.chargingPointsService.activate(+id);
  }
}
