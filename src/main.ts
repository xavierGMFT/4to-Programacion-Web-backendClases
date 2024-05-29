import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS para permitir solicitudes desde el frontend Angular
  await app.listen(3000); // Inicia la aplicación en el puerto 3000
}
bootstrap();
