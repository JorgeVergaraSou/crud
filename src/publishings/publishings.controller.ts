import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublishingsService } from './publishings.service';
import { CreatePublishingDto } from './dto/create-publishing.dto';
import { UpdatePublishingDto } from './dto/update-publishing.dto';

@Controller('publishings')
export class PublishingsController {
  constructor(private readonly publishingsService: PublishingsService) {}

  @Post()
  create(@Body() createPublishingDto: CreatePublishingDto) {
    return this.publishingsService.create(createPublishingDto);
  }

  @Get()
  findAll() {
    return this.publishingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublishingDto: UpdatePublishingDto) {
    return this.publishingsService.update(+id, updatePublishingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishingsService.remove(+id);
  }
}
