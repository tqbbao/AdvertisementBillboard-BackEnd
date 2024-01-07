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
import { TempSpaceService } from './temp-space.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { UpdateTempSpaceDto } from './dto/update-temp-space.dto';
import { CreateTempSpaceDto } from './dto/create-temp-space.dto';
import { Pagination } from './dto/pagination';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('temp-space')
@Controller('temp-space')
export class TempSpaceController {
  constructor(private tempSpaceService: TempSpaceService) {}

  //Find all temp space with state pending
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách temp space' })
  @ApiQuery({ name: 'pagination', type: Pagination, required: false })
  async findAllTempSpacePending(@Query() pagination: Pagination) {
    return await this.tempSpaceService.findAllTempSpacePending(pagination);
  }

  //Find temp space by id
  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết temp space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @HttpCode(200)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const temp_space = await this.tempSpaceService.findTempSpaceById(id);
      if (!temp_space) {
        return [];
      }
      return temp_space;
    } catch (error) {}
  }

  //Declined temp space
  @Get('/declined/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Tu choi temp space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async declinedTempSpace(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSpaceService.rejectTempSpace(id);
  }

  //Accept temp space
  @Get('/accept/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Duyet temp space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async acceptTempSpace(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSpaceService.acceptTempSpaceAll(id);
  }
  //Create temp space condition update space
  @Post('/condition-update')
  @ApiOperation({ summary: 'Cap nhap temp space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('spaces')))
  async createTempSpace(
    @Req() req: any,
    @Body() data: UpdateTempSpaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.tempSpaceService.createTempSpaceConditionUpdate({
      ...data,
      imgUrl: fullFilePath,
    });
  }

  //Create temp space condition create space
  @Post('/condition-create')
  @ApiOperation({ summary: 'Tạo temp space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('spaces')))
  async createTempSpaceConditionCreate(
    @Req() req: any,
    @Body() data: CreateTempSpaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.tempSpaceService.createTempSpaceConditionCreate({
      ...data,
      imgUrl: fullFilePath,
    });
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Xóa temp space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async deleteTempSpaceById(@Param('id', ParseIntPipe) id: number) {
    return await this.tempSpaceService.deleteTempSpaceById(id);
  }
}
