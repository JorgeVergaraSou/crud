import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublishingsService } from './publishings.service';
import { CreatePublishingDto } from './dto/create-publishing.dto';
import { UpdatePublishingDto } from './dto/update-publishing.dto';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Auth(Role.USER)  
@Controller('publishings')
export class PublishingsController {
  constructor(private readonly publishingsService: PublishingsService) {}

  @Post()
  create(@Body() createPublishingDto: CreatePublishingDto, @ActiveUser() user: UserActiveInterface) {
    return this.publishingsService.create(createPublishingDto, user);
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
