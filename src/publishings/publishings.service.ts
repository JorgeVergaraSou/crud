import { Injectable } from '@nestjs/common';
import { CreatePublishingDto } from './dto/create-publishing.dto';
import { UpdatePublishingDto } from './dto/update-publishing.dto';

@Injectable()
export class PublishingsService {
  create(createPublishingDto: CreatePublishingDto) {
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
