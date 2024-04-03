import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { FindManyOptions, FindOneOptions, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) { }

  async create(createBreedDto: CreateBreedDto) {

    const findExist = await this.findOneByName(createBreedDto.nameBreed)

    if (findExist) {
      throw new BadRequestException('Breed already exist');
    }
    return await this.breedRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async softDelete(id: number) {
    const breed = await this.findOne( id ); // Corregir la llamada a findOne
    if (!breed) {
      throw new NotFoundException('Breed not found');
    }
    breed.isActive = 0; // Desactivar (soft-delete)
    await this.breedRepository.save(breed);
  }

  /** BUSCA BREED POR ID */
  async findOne(id: number) {
    return await this.breedRepository.findOne({ where: { idBreed: id } });
  }
  
  /** BUSCA BREED POR NAME */
  async findOneByName(breed: string) {
    const findByName: FindOneOptions<Breed> = {
      where: { nameBreed: breed }
    };
    return await this.breedRepository.findOne(findByName);
  }
  /** ES UN DELETE LOGICO */
  async remove(id: number) {
    return await this.breedRepository.softDelete(id);
  }

  async restore(id: number) {
    return await this.breedRepository.restore(id);
  }

  async update(id: number, updateBreed: CreateBreedDto) {
    return await this.breedRepository.update(id, updateBreed);
  }

  async validateBreed(breed: string) {
    /* cuando vayamos a crear una mascota, primero va a buscar el nombre de la raza  */
    const breedEntity = await this.breedRepository.findOneBy({ nameBreed: breed });
    /* si no existe va lanzar un error y si existe va a guardar el gato co la raza en contrada */
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
    return breedEntity
  }


}
