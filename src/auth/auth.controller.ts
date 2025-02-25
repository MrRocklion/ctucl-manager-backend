import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión de usuario con Token' })   
  async login(@Body() body:LoginDto, @Res() res: Response) {
    const token = await this.authService.login(body);

    if (token?.access) {
      res.cookie('token', token, {
        httpOnly: true, // La cookie no es accesible desde JavaScript
        secure: true, // Solo enviar sobre HTTPS
        sameSite: 'none', // Permitir solicitudes cruzadas
        domain: '.ctucl-manager-frontend.vercel.app', //rmitir cookies en subdominios
    });
      //ojala esta vex funcione 2

      return res.status(HttpStatus.OK).json({ message: 'Login exitoso',auth:true,data:token.data });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Credenciales incorrectas',auth:false,data:token?.data });
    }
  }
}
