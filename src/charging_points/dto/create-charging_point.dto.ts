import { charging_points } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class CreateChargingPointDto implements Omit<charging_points, 'id' | 'createdAt' | 'updatedAt' | 'uuid'> {
  
  @ApiProperty({ example: -2.189412, description: 'Latitud geográfica del punto de carga' })
  lat: number;

  @ApiProperty({ example: -79.889421, description: 'Longitud geográfica del punto de carga' })
  lon: number;

  @ApiProperty({ example: 'Librería ubicada en el parque central', description: 'Breve descripción del negocio', nullable: true })
  description: string | null;

  @ApiProperty({ example: '1103599671001', description: 'Número de RUC del negocio' })
  ruc: string;

  @ApiProperty({ example: '1103599671', description: 'Cédula de identidad del propietario' })
  ci: string;

  @ApiProperty({ example: 'John', description: 'Nombre del propietario del negocio' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del propietario del negocio' })
  lastname: string;

  @ApiProperty({ example: null, description: 'ID del dispositivo que reporta datos', nullable: true })
  device_id: string | null;

  @ApiProperty({ example: 'jhondoe123', description: 'Usuario de la aplicación de recargas', nullable: true })
  user: string | null;

  @ApiProperty({ example: 'Librería John Doe', description: 'Nombre comercial del negocio' })
  business_name: string;

  @ApiProperty({ example: 'jhondoe@email.com', description: 'Correo electrónico del negocio' })
  email: string;

  @ApiProperty({ example: '0987654321', description: 'Número de teléfono de contacto' })
  phone: string;

  @ApiProperty({ example: '01005497845213321', description: 'IMEI del dispositivo asociado' })
  imei: string;

  @ApiProperty({ example: 'Av. Siempre Viva 742', description: 'Dirección física del negocio' })
  address: string;
}
