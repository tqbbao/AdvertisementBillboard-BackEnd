import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportSurface } from 'src/entity/reportSurface.entity';
import { Repository } from 'typeorm';
import { CreateReportSurface } from './dto/create-reportSurface.dto';
import { UpdateReportSurface } from './dto/update-reportSurface.dto';

@Injectable()
export class ReportsSurfaceService {
  constructor(
    @InjectRepository(ReportSurface)
    private readonly reportSurfaceRepository: Repository<ReportSurface>,
  ) {}

  //Find report surface by id
  async findReportSurfaceById(id: number) {
    return await this.reportSurfaceRepository.findOne({
      where: { id: id },
      relations: {
        formReport: true,
        surface: true,
      },
    });
  }

  //Create a new report surface
  async createReportSurface(data: CreateReportSurface) {
    try {
      const reportSurface = this.reportSurfaceRepository.create(data);
      return await this.reportSurfaceRepository.save(reportSurface);
    } catch (error) {
      throw error;
    }
  }

  //Update a report surface
  async updateReportSurface(id: number, data: UpdateReportSurface) {
    try {
      let reportSurface = await this.findReportSurfaceById(id);
      if (!reportSurface) {
        throw new Error('Report surface not found');
      }
      reportSurface = { ...reportSurface, ...data };
      return await this.reportSurfaceRepository.save(reportSurface);
    } catch (error) {
      throw error;
    }
  }

  //Soft delete a report surface
  async removeReportSurface(id: number) {
    try {
      const reportSurface = await this.findReportSurfaceById(id);
      if (!reportSurface) {
        throw new Error('Report surface not found');
      }
      return await this.reportSurfaceRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  //Restore a report surface
  async restoreReportSurface(id: number) {
    try {
      return await this.reportSurfaceRepository.restore(id);
    } catch (error) {
      throw error;
    }
  }
}
