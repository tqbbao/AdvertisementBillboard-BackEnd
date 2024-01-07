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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('temp-surface')
@Controller('temp-surface')
export class TempSurfaceController {
  constructor(private readonly tempSurfaceService: TempSurfaceService) {}

  //Find all temp surface with state pending
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách temp surface' })
  @ApiQuery({ name: 'pagination', type: Pagination, required: false })
  @Get()
  async findAllTempSurfacePending(@Query() pagination: Pagination) {
    return await this.tempSurfaceService.findAllTempSurfacePending(pagination);
  }

  //Find temp surface by id
  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết temp surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @HttpCode(200)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const temp_surface =
        await this.tempSurfaceService.findTempSurfaceById(id);
      if (!temp_surface) {
        return [];
      }
      return temp_surface;
    } catch (error) {}
  }

  //Find all temp surface by space id
  @Get('/space/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách temp surface theo space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async findAllTempSurfaceBySpaceId(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSurfaceService.findAllTempSurfaceBySpaceId(id);
  }

  //Declined temp surface
  @Get('/declined/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Huy temp surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async declinedTempSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSurfaceService.rejectStateTempSurface(id);
  }

  //Accept temp surface
  @Get('/accept/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Duyet temp surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async acceptTempSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSurfaceService.acceptTempSurfaceAll(id);
  }

  //Create temp surface condition update surface
  @Post('/condition-update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Tạo temp surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
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
  @HttpCode(200)
  @ApiOperation({ summary: 'Tạo temp surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
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
  //Delete temp surface by id
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Xóa temp surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async deleteTempSurfaceById(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSurfaceService.deleteTempSurfaceById(id);
  }
}
