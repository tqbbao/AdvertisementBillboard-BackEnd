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
import { ReportsSpaceService } from './reports-space.service';
import { CreateReportSpaceDto } from './dto/create-reportSpace.dto';
import { UpdateReportSpaceDto } from './dto/update-reportSpace.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { Response } from 'express';

@Controller('reports-space')
export class ReportsSpaceController {
  constructor(private readonly reportsSpaceService: ReportsSpaceService) {}

  //Find all report spaces
  @Get()
  async findAllReportSpaces() {
    return await this.reportsSpaceService.findAllReportSpaces();
  }

  //Find all report spaces by space district id
  @Get('/:id')
  async findAllReportSpacesBySpaceDistrictId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.reportsSpaceService.findAllReportSpacesBySpaceDistrictId(
      id,
    );
  }

  //Create a new report space
  @Post()
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('report-spaces')))
  async createReportSpace(
    @Req() req: any,
    @Body() data: CreateReportSpaceDto,
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
      return await this.reportsSpaceService.createReportSpace({
        ...data,
        imgUrl: fullFilePath,
      });
    } catch (error) {
      throw error;
    }
  }

  //Update a report space
  @Put(':id')
  async updateReportSpace(
    @Body() data: UpdateReportSpaceDto,
    @Body('id') id: number,
  ) {
    return await this.reportsSpaceService.updateReportSpace(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.reportsSpaceService.removeReportSpace(id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.reportsSpaceService.restoreReportSpace(id);
  }
}
