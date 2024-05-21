import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import {DB_TYPE, HOST, USER_DB_NAME, USER_DB_PASSWORD, PORT, DATABASE_NAME   } from '../config.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'], // Puedes incluir otros archivos .env aquí si es necesario
      isGlobal: true, // Hace que el módulo de configuración esté disponible en toda la aplicación
    }),
// CONFIGURACIONES DE LA CONECCION A LA "BD"
    TypeOrmModule.forRoot({
      type: DB_TYPE,
      host: HOST,
      username: USER_DB_NAME,
      password: USER_DB_PASSWORD,
      port: PORT,
      database: DATABASE_NAME,
      autoLoadEntities: true, // CARGA LAS ENTITYS DE FORMA AUTOMATICA PARA NO HACERLO MANUAL
      synchronize: true, // TODO CAMBIO QUE SE GENERE ACA, SE SINCRONIZA CON LA "BD"
      /** DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=161poker
DB_NAME=petlost */
    }),    
    BreedsModule, UsersModule, AuthModule, PetsModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
