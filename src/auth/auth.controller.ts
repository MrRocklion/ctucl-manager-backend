import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión de usuario' })   
  async login(@Body() body:LoginDto, @Res() res: Response) {
    const token = await this.authService.login(body);

    if (token?.access) {
      res.cookie('token', token.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return res.status(HttpStatus.OK).json({ message: 'Login exitoso' });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Credenciales incorrectas' });
    }
  }
}
