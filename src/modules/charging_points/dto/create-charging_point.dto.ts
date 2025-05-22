import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateChargingPointDto {
  @ApiProperty({ example: -2.189412, description: 'Latitud geográfica del punto de carga' })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: -79.889421, description: 'Longitud geográfica del punto de carga' })
  @IsNumber()
  lon: number;

  @ApiProperty({ example: 'Librería ubicada en el parque central', description: 'Breve descripción del negocio', nullable: true })
  @IsOptional()
  @IsString()
  description?: string ;

  @ApiProperty({ example: '1103599671001', description: 'Número de RUC del negocio' })
  @IsString()
  ruc: string;

  @ApiProperty({ example: '1103599671', description: 'Cédula de identidad del propietario' })
  @IsString()
  ci: string;

  @ApiProperty({ example: 'John', description: 'Nombre del propietario del negocio' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del propietario del negocio' })
  @IsString()
  lastname: string;

  @ApiProperty({ example: null, description: 'ID del dispositivo que reporta datos', nullable: true })
  @IsOptional()
  @IsString()
  device_id?: string | null;

  @ApiProperty({ example: 'jhondoe123', description: 'Usuario de la aplicación de recargas', nullable: true })
  @IsOptional()
  @IsString()
  user?: string | null;

  @ApiProperty({ example: 'Librería John Doe', description: 'Nombre comercial del negocio' })
  @IsString()
  business_name: string;

  @ApiProperty({ example: 'jhondoe@email.com', description: 'Correo electrónico del negocio' })
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiProperty({ example: '0987654321', description: 'Número de teléfono de contacto' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '01005497845213321', description: 'IMEI del dispositivo asociado' })
  @IsOptional()
  @IsString()
  imei?: string | null;

  @ApiProperty({ example: 'Av. Siempre Viva 742', description: 'Dirección física del negocio' })
  @IsString()
  address: string;
}
