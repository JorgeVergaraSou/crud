import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';

import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from "../common/enums/role.enum";
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';


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


  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.breedsService.findAll(user);
  }

}