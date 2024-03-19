import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pets)
    private readonly petRepository: Repository <Pets>,
    @InjectRepository(Breed) 
    private readonly breedRepository: Repository<Breed>){}

 // ------------- INICIO CREATE -----------
 async create(createPetDto: CreatePetDto, user: UserActiveInterface) {

  try {
    const breed = await this.validateBreed(createPetDto.breed)
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
    console.log(user.idUser);
    console.log(error);
    throw new InternalServerErrorException("Fallo la creación de la mascota 2");
  }

   
}
  // ---------------- FIN CREATE ----------

  /** --------------- INICIO FINDALL ---------------------- */
  async findAll(user: UserActiveInterface) {
    /** si el rol es ADMIN, regresara todos los registros */
        if (user.role === Role.ADMIN){
          return await this.petRepository.find();
        }
    /** si el rol es USER, regresara solo los registros del USUARIO */
        return await this.petRepository.find({
          where: { userIdFk: user.idUser}
        });
      }

    /** --------------- FIN FINDALL ---------------------- */    

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return this.petRepository.softDelete(id);
  }

  restore(id: number) {
    return this.petRepository.restore(id);
  }

  private async validateBreed(breed: string){
    /* cuando vayamos a crear una mascota, primero va a buscar el nombre de la raza  */
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
    /* si no existe va lanzar un error y si existe va a guardar el gato co la raza en contrada */
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
    return breedEntity
  }
}
