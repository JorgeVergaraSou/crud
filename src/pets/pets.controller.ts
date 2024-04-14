import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('pets') // Define un controlador para manejar las rutas relacionadas con las mascotas
export class PetsController {
  constructor(private readonly petsService: PetsService) { } // Constructor que inyecta el servicio de mascotas

  @Auth(Role.USER) // Aplica el decorador Auth para verificar la autorización del usuario con el rol USER
  @Post() // Define un endpoint para manejar las solicitudes POST a la ruta base del controlador (/pets)
  create(@Body() createPetDto: CreatePetDto, @ActiveUser() user: UserActiveInterface) { // Maneja la solicitud POST para crear una nueva mascota
    return this.petsService.create(createPetDto, user); // Llama al método create del servicio de mascotas y devuelve el resultado
  }

  @Get() // Define un endpoint para manejar las solicitudes GET a la ruta base del controlador (/pets)
  findAll(@ActiveUser() user: UserActiveInterface) { // Maneja la solicitud GET para buscar todas las mascotas
    return this.petsService.findAll(user); // Llama al método findAll del servicio de mascotas y devuelve el resultado
  }

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
