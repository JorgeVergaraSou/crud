import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
// CONFIGURACIONES DE LA CONECCION A LA "BD"
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "161poker",
      database: "petlost",
      autoLoadEntities: true, // CARGA LAS ENTITYS DE FORMA AUTOMATICA PARA NO HACERLO MANUAL
      synchronize: true, // TODO CAMBIO QUE SE GENERE ACA, SE SINCRONIZA CON LA "BD"
    }),    
    BreedsModule, UsersModule, AuthModule, PetsModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
