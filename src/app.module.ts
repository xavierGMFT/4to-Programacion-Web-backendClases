import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ajusta esta ruta según la estructura de tu proyecto
      synchronize: true, // Solo para desarrollo, desactiva en producción
    }),
    ProductsModule,
    TagsModule,
    // Otros módulos que necesites importar
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
