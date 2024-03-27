import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    private readonly petRepository: Repository <Pets>,
    @InjectRepository(Breed) 
    private readonly breedRepository: Repository<Breed>,
    private readonly breedService: BreedsService){}

 /** +++++++++++++++ CREATE INICIO +++++++++++++++ */
 async create(createPetDto: CreatePetDto, user: UserActiveInterface) {

  try {
    const breed = await this.breedService.validateBreed(createPetDto.breed)
    const insertPet =  await this.petRepository.save({
      ...createPetDto,
      breed: breed,
      userIdFk: user.idUser
    })  

    if(insertPet){
      return{ message: 'Mascota creada con exito'}
    }else{
      throw new InternalServerErrorException("Fallo la creación de la mascota 1");
    }    
  } catch (error) {
    throw new InternalServerErrorException("Fallo la creación de la mascota 2");
  }
   
}
   /** +++++++++++++++ CREATE FIN +++++++++++++++ */

  /** --------------- INICIO FINDALL ---------------------- */
  async findAll(user: UserActiveInterface) {
    /** si el rol es ADMIN, regresara todos los registros */
        if (user.role === Role.ADMIN){

          const petsFull = await this.petRepository
          .createQueryBuilder()
          .select()
          .withDeleted() // Incluir registros eliminados lógicamente
          .getMany();
          return petsFull;
        }
    /** si el rol es USER, regresara solo los registros del USUARIO */
        return await this.petRepository.find({
          where: { userIdFk: user.idUser}
        });
      }

    /** --------------- FIN FINDALL ---------------------- */    

  async findOne(id: number) {
    return await this.petRepository.findOne({ where: { idPet: id } });
  }

 /** +++++++++++++++ UPDATE INICIO +++++++++++++++ */
 async update(id: number, updatePetDto: UpdatePetDto) {
    try {
      const updatePet = await this.petRepository.update(id, updatePetDto);
      if (updatePet){
        return{ message: 'Mascota actualizada con exito'};
      }else{
        return{ message: 'Ha ocurrido un error al intentar actualizar la mascota'};
      }      
    } catch (error) {
      throw new InternalServerErrorException("Fallo la consulta s la BD");
    }
  }
 /** +++++++++++++++ UPDATE FIN +++++++++++++++ */

  /** +++++++++++++++ REMOVE AND RESTORE INICIO +++++++++++++++ */
  remove(id: number) {
    return this.petRepository.softDelete(id);
  }

  restore(id: number) {
    return this.petRepository.restore(id);
  }
 /** +++++++++++++++ REMOVE AND RESTORE FIN +++++++++++++++ */
}