import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      
      const savedUser = await this.userRepository.save(createUserDto);

      return {
        message: 'Usuario creado con éxito',
        status: 201,
        result: savedUser,
      };
    } catch (error) {
      console.error('❌ Error al crear usuario:', error);
      return {
        message: error instanceof Error ? error.message : 'Error desconocido',
        status: 500,
        result: null,
      };
    }
  }

  async findUserById(id: string) {
    try {
      const userId = parseInt(id, 10);
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        return {
          message: `Usuario con id ${id} no encontrado`,
          status: 404,
          result: null,
        };
      }

      return {
        message: 'Usuario encontrado',
        status: 200,
        result: user,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : 'Error desconocido',
        status: 500,
        result: null,
      };
    }
  }

  async validateUser(user: LoginDto): Promise<ValidateUserDto> {
    try {
      let foundUser: User | null = null;

      if (user.email) {
        foundUser = await this.userRepository.findOne({
          where: { email: user.email },
        });
      } else if (user.username) {
        foundUser = await this.userRepository.findOne({
          where: { username: user.username },
        });
      }

      return foundUser
        ? { exists: true, data: foundUser }
        : { exists: false, data: null };
    } catch (error) {
      console.error('❌ Error en validateUser:', error);
      return { exists: false, data: null };
    }
  }
}
