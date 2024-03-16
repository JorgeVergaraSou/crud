import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePublishingDto } from './dto/create-publishing.dto';
import { UpdatePublishingDto } from './dto/update-publishing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publishing } from './entities/publishing.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class PublishingsService {

  constructor(
    @InjectRepository(Publishing) private readonly publishRepository: Repository <Publishing>
  ){}
  
  async create(createPublishingDto: CreatePublishingDto, user: UserActiveInterface) {
  
    try {
      const createPublishing = await this.publishRepository.save(createPublishingDto);        
   
      if (createPublishing){
        return {
          message: 'publicacion creada con exito',
          post: createPublishing, // Puedes devolver el objeto insertado si lo necesitas
        };
      }else{
        throw new InternalServerErrorException("Fallo la creación de publicacion 1");
      }
      
    } catch (error) {
      throw new InternalServerErrorException("Fallo la creación de la publicacion 2");
    }

    return 'This action adds a new publishing';
  }

  findAll() {
    return `This action returns all publishings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publishing`;
  }

  update(id: number, updatePublishingDto: UpdatePublishingDto) {
    return `This action updates a #${id} publishing`;
  }

  remove(id: number) {
    return `This action removes a #${id} publishing`;
  }
}
