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
import { ReportsSurfaceService } from './reports-surface.service';
import { CreateReportSurface } from './dto/create-reportSurface.dto';
import { UpdateReportSurface } from './dto/update-reportSurface.dto';
import { PaginationReportSurface } from './dto/pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('reports-surface')
@Controller('reports-surface')
export class ReportsSurfaceController {
  constructor(private readonly reportsSurfaceService: ReportsSurfaceService) {}

  //Find all report surfaces
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách report surface' })
  async findAllReportSurfaces() {
    return await this.reportsSurfaceService.findAllReportSurfaces();
  }

  //Find all report surfaces by ward id and space district id
  @Get('/area')
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách report surface theo khu vực' })
  @ApiQuery({ name: 'pagination', type: PaginationReportSurface, required: false })
  async findAllByArea(@Query() pagination: PaginationReportSurface) {
    return await this.reportsSurfaceService.findAllByArea(pagination);
  }

  //Find report surface by id
  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Chi tiết report surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async findReportSurfaceById(@Param('id', ParseIntPipe) id: number) {
    return await this.reportsSurfaceService.findReportSurfaceById(id);
  }

  //Create a new report surface
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Tạo report surface' })
  @ApiBody({ type: CreateReportSurface })
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('report-surfaces')))
  async createReportSurface(
    @Req() req: any,
    @Body() data: CreateReportSurface,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (req.fileValidationError) {
        throw new BadRequestException(req.fileValidationError);
      }
      if (!file) {
        throw new BadRequestException('File is required');
      }
      const fullFilePath = `${file.destination}/${file.filename}`;
      return await this.reportsSurfaceService.createReportSurface({
        ...data,
        imgUrl: fullFilePath,
      });
    } catch (error) {
      throw error;
    }
  }

  //Update a report surface
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Cập nhật report surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async updateReportSurface(
    @Body() data: UpdateReportSurface,
    @Body('id') id: number,
  ) {
    return await this.reportsSurfaceService.updateReportSurface(id, data);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Xoá report surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async delete(@Param('id') id: number) {
    return await this.reportsSurfaceService.removeReportSurface(id);
  }

  @Post(':id/restore')
  @HttpCode(200)
  @ApiOperation({ summary: 'Khôi phục report surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  restore(@Param('id') id: number) {
    return this.reportsSurfaceService.restoreReportSurface(id);
  }
}
