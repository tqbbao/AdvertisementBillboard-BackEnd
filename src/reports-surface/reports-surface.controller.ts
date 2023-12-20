import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ReportsSurfaceService } from './reports-surface.service';
import { CreateReportSurface } from './dto/create-reportSurface.dto';
import { UpdateReportSurface } from './dto/update-reportSurface.dto';

@Controller('reports-surface')
export class ReportsSurfaceController {
  constructor(private readonly reportsSurfaceService: ReportsSurfaceService) {}

  //Create a new report surface
  @Post()
  async createReportSurface(@Body() data: CreateReportSurface) {
    try {
      return await this.reportsSurfaceService.createReportSurface(data);
    } catch (error) {
      throw error;
    }
  }

  //Update a report surface
  @Put(':id')
  async updateReportSurface(
    @Body() data: UpdateReportSurface,
    @Body('id') id: number,
  ) {
    return await this.reportsSurfaceService.updateReportSurface(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.reportsSurfaceService.removeReportSurface(id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.reportsSurfaceService.restoreReportSurface(id);
  }
}
