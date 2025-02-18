import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  // Deshabilitar CORS completamente
  app.enableCors({
    origin: '*', // Aceptar peticiones desde cualquier origen
    credentials: true, // Permitir cookies y autenticación
    allowedHeaders: '*', // Permitir todos los headers
    methods: '*', // Permitir todos los métodos HTTP
  });

  const config = new DocumentBuilder()
    .setTitle('CTUCL SIMTRA API')
    .setDescription('Api para el sistema SIMTRA de control de flota y gestion del consorcio') 
    .setVersion('1.0')
    .addTag('API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
