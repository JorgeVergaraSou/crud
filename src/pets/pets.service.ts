import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';
import { BreedsService } from 'src/breeds/breeds.service';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pets)
    private readonly petRepository: Repository<Pets>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    private readonly breedService: BreedsService) { }

  /** +++++++++++++++ CREATE INICIO +++++++++++++++ */
  async create(createPetDto: CreatePetDto, user: UserActiveInterface) {

    try {
      const breed = await this.breedService.validateBreed(createPetDto.breed)
      const insertPet = await this.petRepository.save({
        ...createPetDto,
        breed: breed,
        userIdFk: user.idUser        
      })

      if (insertPet) {
        return { message: 'successfully created pet' }
      } else {
        throw new InternalServerErrorException("Error when creating the pet");
      }
    } catch (error) {
      throw new InternalServerErrorException("Error when calling the database");
    }

  }
  /** +++++++++++++++ CREATE FIN +++++++++++++++ */

  /** --------------- INICIO FINDALL ---------------------- */
  async findAll(user: UserActiveInterface) {

    try {
      if (user && user.role === Role.ADMIN) {
        return await this.petRepository.find();
      }
      else if (user && user.role === Role.USER) {
        return await this.petRepository.find({
          where: { userIdFk: user.idUser }
        });
      }
      return await this.petRepository.find({ where: { isActive: 1 } });
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING LIST THE BREED');
    }
 
  }

  /** --------------- FIN FINDALL ---------------------- */

  async findOne(id: number) {
    try {
      return await this.petRepository.findOne({ where: { idPet: id } });
    } catch (error) {
      throw new InternalServerErrorException("DB query failed");
    }
  }

  /** +++++++++++++++ UPDATE INICIO +++++++++++++++ */
  async update(id: number, updatePetDto: UpdatePetDto) {
    try {
      const updatePet = await this.petRepository.update(id, updatePetDto);
      if (updatePet) {
        return { message: 'Pet updated successfully' };
      } else {
        return { message: 'Ha ocurrido un error al intentar actualizar la mascota' };
      }
    } catch (error) {
      throw new InternalServerErrorException("DB query failed");
    }
  }
  /** +++++++++++++++ UPDATE FIN +++++++++++++++ */

  /** +++++++++++++++ REMOVE AND RESTORE INICIO +++++++++++++++ */
  async softDelete(id: number) {
    try {
      const petActive = await this.findOne(id);
      if (!petActive) {
        throw new NotFoundException('Pet not found');
      }

      if (petActive.isActive == 1) {
        petActive.isActive = 0;
      }
      else {
        petActive.isActive = 1;
      }
      await this.petRepository.save(petActive);
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING TO DELETE THE PET');
    }
  }
  /** +++++++++++++++ REMOVE AND RESTORE FIN +++++++++++++++ */
}