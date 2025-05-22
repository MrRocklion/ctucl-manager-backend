import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { FirebaseAuthGuard } from 'src/modules/auth/firebase-auth.guard';

@UseGuards(FirebaseAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findUserById(id);
    }
  @Get('validate')
    validateUser(@Body() user:LoginDto) {
      return this.usersService.validateUser(user);
    }
}
