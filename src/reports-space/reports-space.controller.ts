import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportsSpaceService } from './reports-space.service';
import { CreateReportSpaceDto } from './dto/create-reportSpace.dto';
import { UpdateReportSpaceDto } from './dto/update-reportSpace.dto';

@Controller('reports-space')
export class ReportsSpaceController {
  constructor(private readonly reportsSpaceService: ReportsSpaceService) {}

  //Create a new report space
  @Post()
  async createReportSpace(@Body() data: CreateReportSpaceDto) {
    try {
      return await this.reportsSpaceService.createReportSpace(data);
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
