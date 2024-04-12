import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.postsService.findAll(user);
  }

  @Auth(Role.USER)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @ActiveUser() user: UserActiveInterface) {
    return this.postsService.create(createPostDto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Auth(Role.USER)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: CreatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Auth(Role.USER)
  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.postsService.softDelete(id);
  }
}
