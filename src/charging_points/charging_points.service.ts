import { Injectable } from '@nestjs/common';
import { CreateChargingPointDto } from './dto/create-charging_point.dto';
import { UpdateChargingPointDto } from './dto/update-charging_point.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChargingPointsService {

  constructor(private prismaService: PrismaService){}
  create(createChargingPointDto: CreateChargingPointDto) {
    return this.prismaService.charging_points.create({
			data: createChargingPointDto,
		})
  }

  findAll() {
    return `This action returns all chargingPoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chargingPoint`;
  }

  update(id: number, updateChargingPointDto: UpdateChargingPointDto) {
    return `This action updates a #${id} chargingPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} chargingPoint`;
  }
}
