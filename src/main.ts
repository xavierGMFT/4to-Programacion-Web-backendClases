import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS para permitir solicitudes desde el frontend Angular
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Solo valida las propiedades que tienen decoradores DTO
    forbidNonWhitelisted: true, // Lanza un error si se reciben propiedades que no están en el DTO
    transform: true, // Transforma los payloads para que coincidan con los tipos de los DTOs
  }));
  await app.listen(3000); // Inicia la aplicación en el puerto 3000
}
bootstrap();
