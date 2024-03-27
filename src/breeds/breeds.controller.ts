import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
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
  softDelete(@Param('id') id: number) {
    try {
      this.breedsService.softDelete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Breed not found');
      }
      throw error;
    }
  }
  @Auth(Role.ADMIN)
  @Get('/restore/:id')
  restore(@Param('id') id: number) {
    return this.breedsService.restore(id);
  }


  @Auth(Role.USER)
  @Get('/list')
  findAll() {
    return this.breedsService.findAll();
  }

}