import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión de usuario con Token' })   
  async login(@Body() body:LoginDto) {
    console.log("se hace la peticion");
    console.log(body)
    return await this.authService.login(body)
  }
}
