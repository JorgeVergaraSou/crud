// src/pets/pets.controller.ts
import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PetsService } from './pets.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createPet(
    @Body('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageName = file.filename;
    const newPet = await this.petsService.createPet(name, imageName);
    return newPet;
  }
}

async createPet(createPetDto: CreatePetDto, user: UserActiveInterface) { // Método para crear una nueva mascota
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