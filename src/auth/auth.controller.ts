import { Controller, Post, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión de usuario' })   
  async login(@Body() body, @Res() res: Response) {
    const user = { id: 1, username: 'test', password: 'facil123' };

    const isValid = await this.authService.validateUser(body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = this.authService.login(user);

    res.cookie('token', (await token).access_token, {
      httpOnly: true, // No accesible desde JavaScript
      secure: true, // Solo en HTTPS
      sameSite: 'strict', // Evita ataques CSRF
    });

    return res.json({ message: 'Login exitoso' });
  }
}
