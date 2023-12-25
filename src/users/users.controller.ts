import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
//@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Find all user
  @Get()
  async findAll(@CurrentUser() currentUser) {
    return await this.usersService.findAll();
  }

  //Find by id
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findById(id);
  }

  //Update user
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.usersService.update(id, data);
  }
}
