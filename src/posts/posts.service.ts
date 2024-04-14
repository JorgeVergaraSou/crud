import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postsRepository: Repository<Posts>
  ) { }

  async create(createPostDto: CreatePostDto, user: UserActiveInterface) {
    try {
      // Guarda una nueva publicación en la base de datos, asignando el ID del usuario actual
      const createPosting = await this.postsRepository.save({
        ...createPostDto,
        userIdFk: user.idUser,
      });

      // Verifica si la creación de la publicación fue exitosa
      if (createPosting) {
        // Si fue exitosa, devuelve un mensaje de éxito junto con la información de la publicación creada
        return {
          message: 'Publicación creada con éxito', // Mensaje de éxito
          post: createPosting, // Objeto de la publicación creada
          userIdFk: user.idUser, // ID del usuario que creó la publicación
          idPost: createPosting.idPost, // ID de la publicación creada
        };
      } else {
        // Si la creación de la publicación falla, lanza una excepción de error interno
        throw new InternalServerErrorException("Fallo la creación de la publicación 1");
      }
    } catch (error) {
      // Si hay algún error durante el proceso, lanza una excepción de error interno
      throw new InternalServerErrorException("Fallo la creación de la publicación 2");
    }
  }


  /** --------------- INICIO FINDALL ---------------------- */

  async findAll(user: UserActiveInterface) {
    try {
      // Creamos un constructor de consultas utilizando el repositorio de publicaciones
      let queryBuilder = this.postsRepository.createQueryBuilder("post");

      // Si el usuario es ADMIN, regresamos todos los registros de publicaciones con sus mascotas asociadas
      if (user && user.role === Role.ADMIN) {
        // Unimos la tabla de publicaciones con la tabla de mascotas y seleccionamos las mascotas asociadas
        queryBuilder.leftJoinAndSelect("post.pets", "pet");
      }
      // Si el usuario es USER, regresamos los registros de publicaciones del usuario con sus mascotas asociadas
      else if (user && user.role === Role.USER) {
        // Unimos la tabla de publicaciones con la tabla de mascotas y seleccionamos las mascotas asociadas,
        // y luego aplicamos un filtro para seleccionar solo las publicaciones del usuario actual
        queryBuilder.leftJoinAndSelect("post.pets", "pet")
          .where("post.userIdFk = :userId", { userId: user.idUser });
      }
      // Si no hay usuario, regresamos solo los registros activos de publicaciones con sus mascotas asociadas
      else {
        // Unimos la tabla de publicaciones con la tabla de mascotas y seleccionamos las mascotas asociadas,
        // y luego aplicamos un filtro para seleccionar solo las publicaciones activas
        queryBuilder.leftJoinAndSelect("post.pets", "pet")
          .where("post.isActive = :isActive", { isActive: 1 });
      }

      // Ejecutamos la consulta y retornamos los resultados
      return await queryBuilder.getMany();
    } catch (error) {
      // En caso de error, lanzamos una excepción BadRequest y proporcionamos un mensaje descriptivo
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING LIST THE BREED');
    }
  }



  /** --------------- FIN FINDALL ---------------------- */

  async findOne(id: number) {
    try {
      return await this.postsRepository.findOne({ where: { idPost: id } });
    } catch (error) {
      throw new InternalServerErrorException("DB query failed");
    }
  }

  /** +++++++++++++++ UPDATE INICIO +++++++++++++++ */
  // Método para actualizar una publicación existente en la base de datos
  async update(id: number, updatePostDto: CreatePostDto) {
    try {
      // Actualiza la publicación en la base de datos utilizando el ID proporcionado
      const updatePost = await this.postsRepository.update(id, updatePostDto);

      // Verifica si la actualización fue exitosa
      if (updatePost) {
        // Si la actualización fue exitosa, devuelve un mensaje de éxito
        return { message: 'Publicación actualizada exitosamente' };
      } else {
        // Si la actualización falla, devuelve un mensaje de error
        return { message: 'Ha ocurrido un error al intentar actualizar la publicación' };
      }
    } catch (error) {
      // Si hay un error durante el proceso, lanza una excepción de error interno
      throw new InternalServerErrorException("La consulta a la base de datos ha fallado");
    }
  }

  // Método para realizar un borrado lógico de una publicación
  async softDelete(id: number) {
    try {
      // Busca la publicación en la base de datos utilizando el ID proporcionado
      const posting = await this.findOne(id);

      // Verifica si la publicación existe
      if (!posting) {
        // Si la publicación no existe, lanza una excepción de "No encontrado"
        throw new NotFoundException('Publicación no encontrada');
      }

      // Cambia el estado de activación de la publicación (si está activa, la desactiva, y viceversa)
      posting.isActive = posting.isActive == 1 ? 0 : 1;

      // Guarda los cambios en la base de datos
      await this.postsRepository.save(posting);
    } catch (error) {
      // Si hay un error durante el proceso, lanza una excepción de error de solicitud incorrecta
      throw new BadRequestException(error, 'Error al intentar eliminar la publicación');
    }
  }

}
