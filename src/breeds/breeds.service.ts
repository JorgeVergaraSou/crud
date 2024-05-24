import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) { }
  /** THIS FUNCTION WILL CREATE A NEW BREED */
  async create(createBreedDto: CreateBreedDto) {
    try {
      const findExist = await this.findOneByName(createBreedDto.nameBreed)

      if (findExist) {
        throw new BadRequestException('Breed already exist');
      }
      return await this.breedRepository.save(createBreedDto);
    } catch (error) {
      throw new InternalServerErrorException(error, 'QUERY FAILED WHEN TRYING CREATE THE BREED');
    }
  }
  /** */

  /** this code will search for records as requested, by admin or by common user */
  async findAll(user: UserActiveInterface) {
    try {
      if (user && user.role === Role.ADMIN) {
        return await this.breedRepository.find();
      }
      return await this.breedRepository.find({ where: { isActive: 1 } });
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING LIST THE BREED');
    }
  }
  /** */

  /** START ++++++ THIS FUNCTION IS RESPONSIBLE FOR ACTIVATING OR DEACTIVATING THE REGISTRY ++++++ */
  async softDelete(id: number) {
    try {
      const breed = await this.findOne(id);
      if (!breed) {
        throw new NotFoundException('Breed not found');
      }

      if (breed.isActive == 1) {
        breed.isActive = 0;
      }
      else {
        breed.isActive = 1;
      }
      await this.breedRepository.save(breed);
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING TO DELETE THE BREED');
    }
  }
  /** END ++++++ THIS FUNCTION IS RESPONSIBLE FOR ACTIVATING OR DEACTIVATING THE REGISTRY ++++++ */

  /** THIS FUNCTION SEARCHES FOR A BREED BY ID */
  async findOne(id: number) {
    try {
      return await this.breedRepository.findOne({ where: { idBreed: id } });
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING TO FIND BY ID THE BREED');
    }
  }

  /** THIS FUNCTION SEARCHES FOR A BREED BY NAME */
  async findOneByName(breed: string) {
    try {
      const findByName: FindOneOptions<Breed> = {
        where: { nameBreed: breed }
      };
      return await this.breedRepository.findOne(findByName);
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING TO FIND BY NAME THE BREED');
    }
  }
  /** THIS FUNCTION UPDATE THE BREED */
  async update(id: number, updateBreed: CreateBreedDto) {
    try {
      return await this.breedRepository.update(id, updateBreed);
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING TO UPDATE THE BREED');
    }
  }
  /** */
  async validateBreed(breed: string) {
    try {
       /* cuando vayamos a crear una mascota, primero va a buscar el nombre de la raza  */
    const breedEntity = await this.breedRepository.findOneBy({ nameBreed: breed });
    /* si no existe va lanzar un error y si existe va a guardar la mascota con la raza encontrada */
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
    return breedEntity
    } catch (error) {
      throw new InternalServerErrorException(error, 'QUERY FAILED WHEN TRYING VALIDATE THE BREED');
    }   
  }
}