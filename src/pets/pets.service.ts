import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository <Pet>,
    @InjectRepository(Breed) 
    private readonly breedRepository: Repository<Breed>){}

 // ------------- INICIO CREATE -----------
 async create(createPetDto: CreatePetDto, user: UserActiveInterface) {

  const breed = await this.validateBreed(createPetDto.breed)

  return await this.petRepository.save({
    ...createPetDto,
    breed: breed,
    userEmail: user.email
  })
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
          where: { userEmail: user.email}
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
