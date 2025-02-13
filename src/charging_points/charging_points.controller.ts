import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { ChargingPointsService } from './charging_points.service';
import { CreateChargingPointDto } from './dto/create-charging_point.dto';
import { UpdateChargingPointDto } from './dto/update-charging_point.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('charging-points')
export class ChargingPointsController {
  constructor(private readonly chargingPointsService: ChargingPointsService) {}
  @UseGuards(JwtAuthGuard)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargingPointDto: UpdateChargingPointDto) {
    return this.chargingPointsService.update(+id, updateChargingPointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargingPointsService.remove(+id);
  }
}
