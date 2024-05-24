import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [  /* siempre hay que importar el type para que los modulos, entitys, etc interactuen
  con la BD */
    TypeOrmModule.forFeature([User]), PostsModule  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // SE EXPORTA PARA QUE PUEDA SER USADO POR LA "AUTH"
})
export class UsersModule {}
