import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postsRepository: Repository<Posts>
    ){}

  async create(createPostDto: CreatePostDto, user: UserActiveInterface) {
    try {

      const createPosting = await this.postsRepository.save( {
        ...createPostDto,
        user_id: user.idUser,
      } );        
   console.log(user.idUser);
   console.log(user.email);
   console.log(user.role);
      if (createPosting){
        return {
          message: 'publicacion creada con exito',
          post: createPosting, // Puedes devolver el objeto insertado si lo necesitas
        };
      }else{
        throw new InternalServerErrorException("Fallo la creación de publicacion 1");
      }
      
    } catch (error) {
      throw new InternalServerErrorException("Fallo la creación de la publicacion 2");
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
