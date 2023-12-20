import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { Pagination } from './dto/pagination';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@Controller('spaces')
@UseInterceptors(ClassSerializerInterceptor)
export class SpacesController {
  constructor(private spacesService: SpacesService) {}

  @Get('/pagination')
  async findAll(@Query() pagination: Pagination) {
    return await this.spacesService.findAll(pagination);
  }

  @Get(':lat,:long')
  async findByLatLong(@Param('lat') lat: number, @Param('long') long: number) {
    return await this.spacesService.findByLatLong(lat, long);
  }
  @Get('/reversegeocoding/:lat,:long')
  async reverseGeocoding(
    @Param('lat') lat: number,
    @Param('long') long: number,
  ) {
    return await this.spacesService.reverseGeocoding(lat, long);
  }

  @Post()
  async create(@Body() data: CreateSpaceDto) {
    return await this.spacesService.createSpace(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSpaceDto,
  ) {
    return await this.spacesService.updateSpace(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.spacesService.removeSpace(id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.spacesService.restoreSpace(id);
  }
}
