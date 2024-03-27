import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postsRepository: Repository<Posts>
  ) { }

  async create(createPostDto: CreatePostDto, user: UserActiveInterface) {
   
    try {
      const createPosting = await this.postsRepository.save({
        ...createPostDto,
        userIdFk: user.idUser,
      });

      if (createPosting) {
        return {
          message: 'publicacion creada con exito',
          post: createPosting, // Puedes devolver el objeto insertado si lo necesitas
          userIdFk: user.idUser,
          idPost: createPosting.idPost,
        };
      } else {
        throw new InternalServerErrorException("Fallo la creación de publicacion 1");
      }

    } catch (error) {
      throw new InternalServerErrorException("Fallo la creación de la publicacion 2");
    }
  }

  /** --------------- INICIO FINDALL ---------------------- */
  async findAll(user: UserActiveInterface) {
    /** si el rol es ADMIN, regresara todos los registros */
    if (user.role === Role.ADMIN) {
      const postWithDelete = await this.postsRepository

      .createQueryBuilder()
      .select()
      .withDeleted() // Incluir registros eliminados lógicamente
      .getMany();

      return postWithDelete;
    } /** si el rol es USER, regresara solo los registros del USUARIO */
    else if(user.role === Role.USER){
      return await this.postsRepository.find({
        where: { userIdFk: user.idUser }
      });
    }
    return await this.postsRepository.find(); 

  }
/*
  async findLostPet(user: UserActiveInterface){

  }
*/
  /** --------------- FIN FINDALL ---------------------- */
  /*
    findOne(id: number) {
      return `This action returns a #${id} post`;
    }
  
    update(id: number, updatePostDto: UpdatePostDto) {
      return `This action updates a #${id} post`;
    }
  */
  remove(id: number) {
    return this.postsRepository.softDelete(id);
  }

  restore(id: number) {
    return this.postsRepository.restore(id);
  }
}
