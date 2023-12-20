import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportsBillboardService } from './reports-billboard.service';
import { CreateReportBillboard } from './dto/create-reportsBillboard.dto';
import { UpdateReportBillboard } from './dto/update-reportBillboard.dto';

@Controller('reports-billboard')
export class ReportsBillboardController {
  constructor(
    private readonly reportsBillboardService: ReportsBillboardService,
  ) {}

  //Create a new report billboard
  @Post()
  async createReportBillboard(@Body() data: CreateReportBillboard) {
    try {
      return await this.reportsBillboardService.createReportBillboard(data);
    } catch (error) {
      throw error;
    }
  }

  //Update a report billboard
  @Put(':id')
  async updateReportBillboard(
    @Body() data: UpdateReportBillboard,
    @Body('id') id: number,
  ) {
    return await this.reportsBillboardService.updateReportBillboard(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.reportsBillboardService.removeReportBillboard(id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: number) {
    return this.reportsBillboardService.restoreReportBillboard(id);
  }
}
