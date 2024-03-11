import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { BreedsModule } from '../breeds/breeds.module';
import { BreedsService } from '../breeds/breeds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), BreedsModule],
  controllers: [PetsController],
  providers: [PetsService, BreedsService],
})
export class PetsModule {}
