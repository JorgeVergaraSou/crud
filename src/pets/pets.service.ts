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
    @InjectRepository(Pets) // Inyecta el repositorio de Pets
    private readonly petRepository: Repository<Pets>, // Declara un atributo para acceder al repositorio de Pets
    @InjectRepository(Breed) // Inyecta el repositorio de Breed
    private readonly breedRepository: Repository<Breed>, // Declara un atributo para acceder al repositorio de Breed
    private readonly breedService: BreedsService) { } // Inyecta el servicio de BreedsService

  /** +++++++++++++++ CREATE INICIO +++++++++++++++ */
  async create(createPetDto: CreatePetDto, user: UserActiveInterface) { // Método para crear una nueva mascota
    try {
      const breed = await this.breedService.validateBreed(createPetDto.breed) // Valida la raza de la mascota
      const insertPet = await this.petRepository.save({ // Guarda la mascota en la base de datos
        ...createPetDto, // Utiliza los datos proporcionados para crear la mascota
        breed: breed, // Asigna la raza validada a la mascota
        userIdFk: user.idUser // Asigna el ID del usuario actual como dueño de la mascota
      })

      if (insertPet) {
        return { message: 'successfully created pet' } // Devuelve un mensaje de éxito si la mascota se crea correctamente
      } else {
        throw new InternalServerErrorException("Error when creating the pet"); // Lanza una excepción si falla la creación de la mascota
      }
    } catch (error) {
      throw new InternalServerErrorException("Error when calling the database"); // Lanza una excepción si hay un error al llamar a la base de datos
    }
  }
  /** +++++++++++++++ CREATE FIN +++++++++++++++ */

  /** --------------- INICIO FINDALL ---------------------- */
  async findAll(userId: number, user: UserActiveInterface) { 
    try {      
     /* if (user && user.role === Role.ADMIN) { 
        return await this.petRepository.find(); 
      }
      else if (user && user.role === Role.USER) { */
        return await this.petRepository.find({ 
          where: { userIdFk: userId }
        });
     // }
      //return await this.petRepository.find({ where: { isActive: 1 } }); 
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING LIST THE BREED'); 
    } 
  }

  /** --------------- FIN FINDALL ---------------------- */

  async findOne(id: number) { // Método para buscar una mascota por su ID
    try {
      return await this.petRepository.findOne({ where: { idPet: id } }); // Busca la mascota por su ID y la devuelve
    } catch (error) {
      throw new InternalServerErrorException("DB query failed"); // Lanza una excepción si falla la consulta
    }
  }

  /** +++++++++++++++ UPDATE INICIO +++++++++++++++ */
  async update(id: number, updatePetDto: UpdatePetDto) { // Método para actualizar una mascota
    try {
      const updatePet = await this.petRepository.update(id, updatePetDto); // Actualiza la mascota en la base de datos
      if (updatePet) {
        return { message: 'Pet updated successfully' }; // Devuelve un mensaje de éxito si la actualización es exitosa
      } else {
        return { message: 'Ha ocurrido un error al intentar actualizar la mascota' }; // Devuelve un mensaje de error si falla la actualización
      }
    } catch (error) {
      throw new InternalServerErrorException("DB query failed"); // Lanza una excepción si falla la consulta
    }
  }
  /** +++++++++++++++ UPDATE FIN +++++++++++++++ */

  /** +++++++++++++++ REMOVE AND RESTORE INICIO +++++++++++++++ */
  async softDelete(id: number) { // Método para realizar un borrado lógico de una mascota
    try {
      const petActive = await this.findOne(id); // Busca la mascota por su ID
      if (!petActive) {
        throw new NotFoundException('Pet not found'); // Lanza una excepción si la mascota no se encuentra
      }

      if (petActive.isActive == 1) { // Si la mascota está activa
        petActive.isActive = 0; // La desactiva
      }
      else {
        petActive.isActive = 1; // Si no está activa, la activa
      }
      await this.petRepository.save(petActive); // Guarda los cambios en la base de datos
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING TO DELETE THE PET'); // Lanza una excepción si falla la consulta
    }
  }
  /** +++++++++++++++ REMOVE AND RESTORE FIN +++++++++++++++ */
}
