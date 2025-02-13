import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(cookieParser()); // Habilita el middleware de cookies

  const config = new DocumentBuilder()
    .setTitle('CTUCL SIMTRA API') // Título de la API
    .setDescription('Api para el sistema SIMTRA de control de flota y gestion del consorcio') 
    .setVersion('1.0') // Versión de la API
    .addTag('API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();