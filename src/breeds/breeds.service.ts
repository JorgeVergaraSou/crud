import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class BreedsService {

  constructor(
  @InjectRepository(Breed)
  private readonly breedRepository: Repository<Breed>
  ){}

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: number) {
    const findById: FindOneOptions<Breed> = {
      where: { idBreed: id }
    };
    return this.breedRepository.findOne(findById);
  }
  remove(id: number) {
    return this.breedRepository.softDelete(id);
  }

  restore(id: number) {
    return this.breedRepository.restore(id);
  }

 async  update(id:number, updateBreed: CreateBreedDto){
return await this.breedRepository.update(id, updateBreed);
  }
}
