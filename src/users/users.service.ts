import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService){}
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      return await this.prismaService.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }


  async findUserById(id: string) {
    return  this.prismaService.users.findUnique(
      {
        where:{uuid:id}
      }
    )
  }

  async validateUser(user: LoginDto): Promise<ValidateUserDto> {
    const exists = await this.prismaService.users.findUnique({
      where: {
        username: user.username,
      },
    });
  
    return exists ? { exists: true, data: exists } : { exists: false, data: null };
  }
  



}
