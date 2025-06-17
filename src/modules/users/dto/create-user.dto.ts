import { ApiProperty } from '@nestjs/swagger';

export enum AccountType {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  USER = 'USER',
}
export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Nombre de usuario único' })
  username: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Correo electrónico único' })
  email: string;

  @ApiProperty({ example: '0987654321', description: 'Número de teléfono', required: false })
  phone: string;

  @ApiProperty({ example: '12345678', description: 'Número de cedula', required: false })
  register: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123', description: 'Dirección del usuario' })
  address: string;

  @ApiProperty({ example: AccountType.USER, description: 'Tipo de cuenta',enum: AccountType, })
  accountType: AccountType;

  @ApiProperty({ example: 'John', description: 'Nombre del usuario' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del usuario' })
  lastname: string;

  @ApiProperty({ example: '1990-05-15T00:00:00.000Z', description: 'Fecha de nacimiento en formato ISO8601' })
  birthday: Date;
}
