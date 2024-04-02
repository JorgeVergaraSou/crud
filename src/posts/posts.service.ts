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
    try {
      if (user && user.role === Role.ADMIN) {
        return await this.postsRepository.find();
      }
      else if (user && user.role === Role.USER) {
        return await this.postsRepository.find({
          where: { userIdFk: user.idUser }
        });
      }
      return await this.postsRepository.find({ where: { isActive: 1 } });
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING LIST THE BREED');
    }

  }
/*
  async findLostPet(user: UserActiveInterface){

  }
*/
  /** --------------- FIN FINDALL ---------------------- */
  
  async findOne(id: number) {
    try {
      return await this.postsRepository.findOne({ where: { idPost: id } });
    } catch (error) {
      throw new InternalServerErrorException("DB query failed");
    }
  }
  /*
    update(id: number, updatePostDto: UpdatePostDto) {
      return `This action updates a #${id} post`;
    }
  */
    async softDelete(id: number) {
      try {
        const posting = await this.findOne(id);
        if (!posting) {
          throw new NotFoundException('Post not found');
        }
  
        if (posting.isActive == 1) {
          posting.isActive = 0;
        }
        else {
          posting.isActive = 1;
        }
        await this.postsRepository.save(posting);
      } catch (error) {
        throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING TO DELETE THE POST');
      }
    }
}
