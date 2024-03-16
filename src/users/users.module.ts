import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Publishing } from '../publishings/entities/publishing.entity';

@Module({
  imports: [  /* siempre hay que importar el type para que los modulos, entitys, etc interactuen
  con la BD */
    TypeOrmModule.forFeature([User, Publishing])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // SE EXPORTA PARA QUE PUEDA SER USADO POR LA "AUTH"
})
export class UsersModule {}
