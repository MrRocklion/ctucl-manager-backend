import { Injectable } from '@nestjs/common';
import { CreateChargingPointDto } from './dto/create-charging_point.dto';
import { UpdateChargingPointDto } from './dto/update-charging_point.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChargingPoint } from 'src/database/entities/charging-point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChargingPointsService {
  constructor(
    @InjectRepository(ChargingPoint)
    private readonly chargingPointsRepository: Repository<ChargingPoint>,
  ) {}

  async create(createChargingPointDto: CreateChargingPointDto) {
    try {
      const dto = {
        ...createChargingPointDto,
        device_id: createChargingPointDto.device_id ?? undefined,
        user: createChargingPointDto.user ?? undefined,
        email: createChargingPointDto.email ?? undefined,
        imei: createChargingPointDto.imei ?? undefined,
        description: createChargingPointDto.description ?? undefined,
      };
      

      const newChargingPoint = this.chargingPointsRepository.create(dto);
      
      await this.chargingPointsRepository.save(newChargingPoint);

      return {
        message: 'Punto de carga creado con éxito',
        status: 201,
        result: newChargingPoint,
      };
    } catch (error) {
      console.error("❌ Error al crear el punto de carga:", error);
      return {
        message: error instanceof Error ? error.message : "Error desconocido",
        status: 500,
        result: null,
      };
    }
  }

  // Método para obtener todos los puntos de carga
  async findAll() {
    try {
      const chargingPoints = await this.chargingPointsRepository.find(
        {
          where: { is_active: true },
          order: { createdAt: 'DESC' },
        },
      );
      return {
        message: 'Puntos de carga obtenidos con éxito',
        status: 200,
        result: chargingPoints,
      };
    } catch (error) {
      console.error("❌ Error al obtener los puntos de carga:", error);
      return {
        message: error instanceof Error ? error.message : "Error desconocido",
        status: 500,
        result: null,
      };
    }
  }

  async findOne(id: number): Promise<{
    message: string;
    status: number;
    result: ChargingPoint | null;
  }> {
    try {
      const chargingPoint = await this.chargingPointsRepository.findOneBy({ id });
      if (!chargingPoint) {
        return {
          message: `Punto de carga con id ${id} no encontrado`,
          status: 404,
          result: null,
        };
      }
      return {
        message: 'Punto de carga obtenido con éxito',
        status: 200,
        result: chargingPoint,
      };
    } catch (error) {
      console.error('❌ Error al obtener el punto de carga:', error);
      return {
        message: error instanceof Error ? error.message : 'Error desconocido',
        status: 500,
        result: null,
      };
    }
  }
  

  // Método para actualizar un punto de carga
  async update(id: number, updateChargingPointDto: UpdateChargingPointDto) {
    try {
      const chargingPoint = await this.chargingPointsRepository.findOneBy({id});
      if (!chargingPoint) {
        return {
          message: `Punto de carga con id ${id} no encontrado`,
          status: 404,
          result: null,
        };
      }

      // Actualizamos el punto de carga con los nuevos datos
      const updatedChargingPoint = await this.chargingPointsRepository.save({
        ...chargingPoint,
        ...updateChargingPointDto,
      });

      return {
        message: 'Punto de carga actualizado con éxito',
        status: 200,
        result: updatedChargingPoint,
      };
    } catch (error) {
      console.error("❌ Error al actualizar el punto de carga:", error);
      return {
        message: error instanceof Error ? error.message : "Error desconocido",
        status: 500,
        result: null
      };
    }
  }

  // Método para eliminar un punto de carga
  async softDelete(id: number) {
    try {
      const chargingPoint = await this.chargingPointsRepository.findOneBy({id});
      if (!chargingPoint) {
        return {
          message: `Punto de carga con id ${id} no encontrado`,
          status: 404,
          result: null
        };
      }
      await this.chargingPointsRepository.update(id, { is_active: false });

      return {
        message: 'Punto de carga eliminado con éxito',
        status: 204 ,
      };
    } catch (error) {
      console.error("❌ Error al eliminar el punto de carga:", error);
      return {
        message: error instanceof Error ? error.message : "Error desconocido",
        status: 500,
        result: null
      };
    }
  }

    async activate(id: number) {
    try {
      const chargingPoint = await this.chargingPointsRepository.findOneBy({id});
      if (!chargingPoint) {
        return {
          message: `Punto de carga con id ${id} no encontrado`,
          status: 404,
          result: null
        };
      }
      await this.chargingPointsRepository.update(id, { is_active: true });

      return {
        message: 'Punto de carga activado con éxito',
        status: 204 ,
      };
    } catch (error) {
      console.error("❌ Error al activar el punto de carga:", error);
      return {
        message: error instanceof Error ? error.message : "Error desconocido",
        status: 500,
        result: null
      };
    }
  }
}
