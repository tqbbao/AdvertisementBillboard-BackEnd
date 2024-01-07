import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
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
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
//@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Find all user
  @Get()
  @ApiOperation({ summary: 'Danh sách người dùng' })  
  @HttpCode(200)
  async findAll(@CurrentUser() currentUser) {
    return await this.usersService.findAll();
  }

  //Find by id
  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết người dùng' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @HttpCode(200)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findById(id);
  }

  //Create user
  @HttpCode(201)
  @Post()
  @ApiOperation({ summary: 'Tạo người dùng' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    return await this.usersService.create(data);
  }

  @HttpCode(200)
  //Update user
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật người dùng' })
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.usersService.update(id, data);
  }
}
