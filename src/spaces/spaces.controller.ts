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
import { SpacesService } from './spaces.service';
import { Pagination } from './dto/pagination';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { Response } from 'express';
import { CustomException } from 'src/common/exceptions/customException';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('spaces')
@Controller('spaces')
@UseInterceptors(ClassSerializerInterceptor)
export class SpacesController {
  constructor(private spacesService: SpacesService) {}

  @HttpCode(200)
  @Get()
  async findAll(@Query() pagination: Pagination) {
    try {
      const spaces = await this.spacesService.findAll(pagination);
      if (spaces.data.length === 0) {
        throw new CustomException('Not found', HttpStatus.NOT_FOUND);
      }
      return spaces;
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @HttpCode(200)
  @Get('/area')
  async findAllByArea(@Query() pagination: Pagination) {
    try {
      const spaces = await this.spacesService.findAllByArea(pagination);
      if (spaces.length === 0) {
        return spaces;
      }
      return spaces;
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //Find by id
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const space = await this.spacesService.findById(id);
      if (!space) {
        throw new CustomException('Not found', HttpStatus.NOT_FOUND);
      }
      return space;
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(200)
  @Get(':lat,:long')
  async findByLatLong(@Param('lat') lat: number, @Param('long') long: number) {
    try {
      const space = await this.spacesService.findByLatLong(lat, long);
      if (!space) {
        throw new CustomException('Not found', HttpStatus.NOT_FOUND);
      }
      return space;
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(200)
  @Get('/reversegeocoding/:lat,:long')
  async reverseGeocoding(
    @Param('lat') lat: number,
    @Param('long') long: number,
  ) {
    return await this.spacesService.reverseGeocoding(lat, long);
  }

  @HttpCode(201)
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

    try {
      const space = await this.spacesService.createSpace({
        ...data,
        imgUrl: fullFilePath,
      });
      return {
        message: 'Create space successfully',
      };
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(200)
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

    try {
      const space = await this.spacesService.updateSpace(id, {
        ...data,
        imgUrl: fullFilePath,
      });
      if (!space) {
        throw new CustomException('Not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Update space successfully',
      };
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.spacesService.removeSpace(id);
  }

  @HttpCode(200)
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
