import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';


@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Auth(Role.USER)
  @Post()
  create(@Body() createPetDto: CreatePetDto, @ActiveUser() user: UserActiveInterface) {
    return this.petsService.create(createPetDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.petsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.petsService.findOne(id);
  }

  @Auth(Role.USER)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Auth(Role.USER)
  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.petsService.softDelete(id);
  }


}
