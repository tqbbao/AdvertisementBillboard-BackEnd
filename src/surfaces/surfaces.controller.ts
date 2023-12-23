import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.surfacesService.removeSurface(id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.surfacesService.restoreSurface(id);
  }
}
