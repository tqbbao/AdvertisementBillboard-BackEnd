import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SurfacesService } from './surfaces.service';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';

@Controller('surfaces')
export class SurfacesController {
  constructor(private surfacesService: SurfacesService) {}

  //Find all surfaces by space id
  @Get(':id')
  async findAllBySpaceId(@Param('id', ParseIntPipe) id: number) {
    return await this.surfacesService.findAllBySpaceId(id);
  }

  //Create a new surface
  @Post()
  async createSurface(@Body() data: CreateSurfaceDto) {
    return await this.surfacesService.createSurface(data);
  }

  //Update a surface
  @Put(':id')
  async updateSurface(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSurfaceDto,
  ) {
    return await this.surfacesService.updateSurface(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.surfacesService.removeSurface(id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.surfacesService.restoreSurface(id);
  }
}
