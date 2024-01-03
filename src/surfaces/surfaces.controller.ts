import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SurfacesService } from './surfaces.service';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { Response } from 'express';
import { PaginationSurface } from './dto/pagination';

@Controller('surfaces')
export class SurfacesController {
  constructor(private surfacesService: SurfacesService) {}

  @HttpCode(200)
  //Find all surfaces
  @Get()
  async findAll() {
    return await this.surfacesService.findAll();
  }

  //Find all surfaces with pagination
  @Get('/pagination')
  async findAllWithPagination(@Query() pagination: PaginationSurface) {
    try {
      const surfaces = await this.surfacesService.findAllWithPagination(pagination);
      if (surfaces.data.length === 0) {
        throw new BadRequestException('Not found');
      }
      return surfaces;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return await this.surfacesService.findAllWithPagination(pagination);
  }

  @HttpCode(200)
  //Find all by area
  @Get('/area')
  async findAllByArea(@Query() pagination: PaginationSurface) {
    return await this.surfacesService.findAllByArea(pagination);
  }

  //Find by id
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.surfacesService.findById(id);
  }

  //Find all surfaces by space id
  @Get('space/:id')
  async findAllBySpaceId(@Param('id', ParseIntPipe) id: number) {
    return await this.surfacesService.findAllBySpaceId(id);
  }

  @HttpCode(201)
  //Create a new surface
  @Post()
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('surfaces')))
  async createSurface(
    @Req() req: any,
    @Body() data: CreateSurfaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.surfacesService.createSurface({
      ...data,
      imgUrl: fullFilePath,
    });
  }
  @HttpCode(200)
  //Update a surface
  @Put(':id')
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('spaces')))
  async updateSurface(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSurfaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.surfacesService.updateSurface(id, {
      ...data,
      imgUrl: fullFilePath,
    });
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.surfacesService.removeSurface(id);
  }

  @HttpCode(200)
  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.surfacesService.restoreSurface(id);
  }
}
