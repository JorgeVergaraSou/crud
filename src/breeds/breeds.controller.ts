import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';

import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from "../common/enums/role.enum";


@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }
  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id);
  }
  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBreedDto: CreateBreedDto) {
    return this.breedsService.update(id, updateBreedDto);
  }
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.breedsService.remove(id);
  }
  @Auth(Role.ADMIN)
  @Get('/restore/:id')
  restore(@Param('id') id: number) {
    return this.breedsService.restore(id);
  }

  @Auth(Role.ADMIN)
  @Get('/listDelete/')
  findSoftDelete() {
    return this.breedsService.findSoftDelete();
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.breedsService.findAll();
  }
}