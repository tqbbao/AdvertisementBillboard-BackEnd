import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TempSurfaceService } from './temp-surface.service';
import { Pagination } from './dto/pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { UpdateTempSurfaceDto } from './dto/update-temp-surface.dto';
import { CreateTempSurfaceDto } from './dto/create-temp-surface.dto';

@Controller('temp-surface')
export class TempSurfaceController {
  constructor(private readonly tempSurfaceService: TempSurfaceService) {}

  //Find all temp surface with state pending
  @Get()
  async findAllTempSurfacePending(@Query() pagination: Pagination) {
    return await this.tempSurfaceService.findAllTempSurfacePending(pagination);
  }

  //Declined temp surface
  @Get('/declined/:id')
  async declinedTempSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSurfaceService.rejectStateTempSurface(id);
  }

  //Accept temp surface
  @Get('/accept/:id')
  async acceptTempSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSurfaceService.acceptTempSurfaceAll(id);
  }

  //Create temp surface condition update surface
  @Post('/condition-update')
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('surfaces')))
  async createTempSurface(
    @Req() req: any,
    @Body() data: UpdateTempSurfaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.tempSurfaceService.createTempSurfaceConditionUpdate({
      ...data,
      imgUrl: fullFilePath,
    });
  }

  //Create temp surface condition create surface
  @Post('/condition-create')
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('surfaces')))
  async createTempSurfaceConditionCreate(
    @Req() req: any,
    @Body() data: CreateTempSurfaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.tempSurfaceService.createTempSurfaceConditionCreate({
      ...data,
      imgUrl: fullFilePath,
    });
  }
}
