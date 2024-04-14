import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('posts') // Define un controlador para manejar las rutas relacionadas con las publicaciones
export class PostsController {
  constructor(private readonly postsService: PostsService) { } // Constructor que inyecta el servicio de Posts

  @Get() // Define un endpoint para manejar las solicitudes GET a la ruta base del controlador (/posts)
  findAll(@ActiveUser() user: UserActiveInterface) { // Maneja la solicitud GET para buscar todas las publicaciones
    return this.postsService.findAll(user); // Llama al método findAll del servicio de publicaciones y devuelve el resultado
  }

  @Auth(Role.USER) // Aplica el decorador Auth para verificar la autorización del usuario con el rol USER
  @Post() // Define un endpoint para manejar las solicitudes POST a la ruta base del controlador (/posts)
  create(@Body() createPostDto: CreatePostDto, @ActiveUser() user: UserActiveInterface) { // Maneja la solicitud POST para crear una nueva publicación
    return this.postsService.create(createPostDto, user); // Llama al método create del servicio de publicaciones y devuelve el resultado
  }

  @Get(':id') // Define un endpoint para manejar las solicitudes GET a una ruta específica del controlador (/posts/:id)
  findOne(@Param('id') id: number) { // Maneja la solicitud GET para buscar una publicación por su ID
    return this.postsService.findOne(id); // Llama al método findOne del servicio de publicaciones y devuelve el resultado
  }

  @Auth(Role.USER) // Aplica el decorador Auth para verificar la autorización del usuario con el rol USER
  @Patch(':id') // Define un endpoint para manejar las solicitudes PATCH a una ruta específica del controlador (/posts/:id)
  update(@Param('id') id: number, @Body() updatePostDto: CreatePostDto) { // Maneja la solicitud PATCH para actualizar una publicación
    return this.postsService.update(id, updatePostDto); // Llama al método update del servicio de publicaciones y devuelve el resultado
  }

  @Auth(Role.USER) // Aplica el decorador Auth para verificar la autorización del usuario con el rol USER
  @Delete(':id') // Define un endpoint para manejar las solicitudes DELETE a una ruta específica del controlador (/posts/:id)
  softDelete(@Param('id') id: number) { // Maneja la solicitud DELETE para realizar un borrado lógico de una publicación
    return this.postsService.softDelete(id); // Llama al método softDelete del servicio de publicaciones y devuelve el resultado
  }
}