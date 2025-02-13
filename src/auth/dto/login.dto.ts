import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'johndoe', description: 'Nombre de usuario' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'securepassword123', description: 'Contraseña del usuario' })
  @IsString()
  password: string;
}