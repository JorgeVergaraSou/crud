import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { validateOrReject } from 'class-validator';

@Controller('pets') // Define un controlador para manejar las rutas relacionadas con las mascotas
export class PetsController {
  constructor(private readonly petsService: PetsService) { } // Constructor que inyecta el servicio de mascotas

  /** crear pet con foto */
  @Auth(Role.USER) // Aplica el decorador Auth para verificar la autorización del usuario con el rol USER
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
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const createPetDto = new CreatePetDto();
    createPetDto.namePet = body.namePet;
    createPetDto.age = body.age;
    createPetDto.breed = body.breed;
    createPetDto.pet = body.pet;
    createPetDto.description = body.description;
    createPetDto.idPostFk = body.idPostFk;
    if (file) {
      createPetDto.image = file.filename;
    }

    await validateOrReject(createPetDto);

    const newPet = await this.petsService.createPet(createPetDto);
    return newPet;
  }


 /** fin pet con foto */ 

  @Get()
findAll(@Query('userId') userId: number, @ActiveUser() user: UserActiveInterface) {

  return this.petsService.findAll(userId, user);
}

  /*
  @Get() 
  findAll(@ActiveUser() user: UserActiveInterface) { 
    return this.petsService.findAll(user); 
  }
*/
  @Get(':id') // Define un endpoint para manejar las solicitudes GET a una ruta específica del controlador (/pets/:id)
  findOne(@Param('id') id: number) { // Maneja la solicitud GET para buscar una mascota por su ID
    return this.petsService.findOne(id); // Llama al método findOne del servicio de mascotas y devuelve el resultado
  }

  @Auth(Role.USER) // Aplica el decorador Auth para verificar la autorización del usuario con el rol USER
  @Patch(':id') // Define un endpoint para manejar las solicitudes PATCH a una ruta específica del controlador (/pets/:id)
  update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) { // Maneja la solicitud PATCH para actualizar una mascota
    return this.petsService.update(id, updatePetDto); // Llama al método update del servicio de mascotas y devuelve el resultado
  }

  @Auth(Role.USER) // Aplica el decorador Auth para verificar la autorización del usuario con el rol USER
  @Delete(':id') // Define un endpoint para manejar las solicitudes DELETE a una ruta específica del controlador (/pets/:id)
  softDelete(@Param('id') id: number) { // Maneja la solicitud DELETE para realizar un borrado lógico de una mascota
    return this.petsService.softDelete(id); // Llama al método softDelete del servicio de mascotas y devuelve el resultado
  }
}
