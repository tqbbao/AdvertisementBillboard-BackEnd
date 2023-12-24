import {
  BadRequestException,
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
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { Pagination } from './dto/pagination';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { Response } from 'express';

@Controller('spaces')
@UseInterceptors(ClassSerializerInterceptor)
export class SpacesController {
  constructor(private spacesService: SpacesService) {}

  @Get('/pagination')
  async findAll(@Query() pagination: Pagination) {
    return await this.spacesService.findAll(pagination);
  }

  
  @Get('/area')
  async findAllByArea(@Query() pagination: Pagination) {
    return await this.spacesService.findAllByArea(pagination);
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
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('spaces')))
  async create(
    @Req() req: any,
    @Body() data: CreateSpaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;

    return await this.spacesService.createSpace({
      ...data,
      imgUrl: fullFilePath,
    });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('spaces')))
  async update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSpaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.spacesService.updateSpace(id, {
      ...data,
      imgUrl: fullFilePath,
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.spacesService.removeSpace(id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.spacesService.restoreSpace(id);
  }

  //Test upload file
  @Post('upload')
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('spaces')))
  uploadFile(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    //`${file.destination}/${file.filename}`

    //1703130360545-FB_IMG_1600578098052.jpg
    console.log(file.filename);
    //./uploads/spaces
    console.log(file.destination);

    return res.sendFile(file.filename, { root: file.destination });
  }

}
