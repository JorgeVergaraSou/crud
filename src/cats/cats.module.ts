import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { BreedsModule } from '../breeds/breeds.module';
import { BreedsService } from 'src/breeds/breeds.service';

@Module({
  // SE DEBE IMPORTAR LA ENTIDAD, EXPONERLA GLOBALMENTE
  imports: [TypeOrmModule.forFeature([Cat]), BreedsModule], /* aca se llama al modulo breed */
  controllers: [CatsController],
  providers: [CatsService, BreedsService],
})
export class CatsModule {}
