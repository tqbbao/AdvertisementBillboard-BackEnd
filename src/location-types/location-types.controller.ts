import { CreateLocationTypesDto } from './dto/create-location-types.dto';
import { LocationTypesService } from './location-types.service';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('location-types')
export class LocationTypesController {
  constructor(private locationTypesService: LocationTypesService) {}

  //Find all
  @Get()
  async findAll() {
    return await this.locationTypesService.findAll();
  }

  //Find by id
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.locationTypesService.findById(id);
  }

  // Create
  @Post()
  async create(@Body() data: CreateLocationTypesDto) {
    return await this.locationTypesService.create(data);
  }

  //Update
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateLocationTypesDto) {
    return await this.locationTypesService.update(id, data);
  }
}
