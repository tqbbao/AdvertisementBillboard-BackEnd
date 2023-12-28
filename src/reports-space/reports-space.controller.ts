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
import { ReportsSpaceService } from './reports-space.service';
import { CreateReportSpaceDto } from './dto/create-reportSpace.dto';
import { UpdateReportSpaceDto } from './dto/update-reportSpace.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { Response } from 'express';
import { PaginationReportSpace } from './dto/pagination';

@Controller('reports-space')
export class ReportsSpaceController {
  constructor(private readonly reportsSpaceService: ReportsSpaceService) {}

  //Find all report spaces
  @HttpCode(200)
  @Get()
  async findAllReportSpaces() {
    return await this.reportsSpaceService.findAllReportSpaces();
  }

  @HttpCode(200)
  @Get('/area')
  async findAllByArea(@Query() pagination: PaginationReportSpace) {
    return await this.reportsSpaceService.findAllByArea(pagination);
  }

  //Find report space by id
  @HttpCode(200)
  @Get(':id')
  async findReportSpaceById(@Param('id', ParseIntPipe) id: number) {
    return await this.reportsSpaceService.findReportSpaceById(id);
  }

  //
  @HttpCode(200)
  @Get('/update-state-report-space-delete/:id')
  async updateStateReportSpaceDelete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.reportsSpaceService.updateStateReportSpaceDelete(
      id,
    );
  }

  //Find all report spaces by space district id
  // @Get('/district/:id')
  // async findAllReportSpacesBySpaceDistrictId(
  //   @Param('id', ParseIntPipe) id: number,
  // ) {
  //   return await this.reportsSpaceService.findAllReportSpacesBySpaceDistrictId(
  //     id,
  //   );
  // }

  //Find all report space by area

  //Create a new report space
  @HttpCode(201)
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
  @HttpCode(200)
  @Put(':id')
  async updateReportSpace(
    @Body() data: UpdateReportSpaceDto,
    @Body('id') id: number,
  ) {
    return await this.reportsSpaceService.updateReportSpace(id, data);
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.reportsSpaceService.removeReportSpace(id);
  }

  @HttpCode(200)
  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.reportsSpaceService.restoreReportSpace(id);
  }
}
