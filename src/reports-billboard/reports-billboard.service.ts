import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportBillboard } from 'src/entity/reportBillboard.entity';
import { In, Repository } from 'typeorm';
import { CreateReportBillboard } from './dto/create-reportsBillboard.dto';
import { UpdateReportBillboard } from './dto/update-reportBillboard.dto';

@Injectable()
export class ReportsBillboardService {
  constructor(
    @InjectRepository(ReportBillboard)
    private readonly reportBillboardRepository: Repository<ReportBillboard>,
  ) {}

  //Find report billboard by id
  async findReportBillboardById(id: number) {
    return await this.reportBillboardRepository.findOne({
      where: { id: id },
      relations: {
        formReport: true,
        surface: true,
      },
    });
  }

  //Create a new report billboard
  async createReportBillboard(data: CreateReportBillboard) {
    try {
      const reportBillboard = this.reportBillboardRepository.create(data);
      return await this.reportBillboardRepository.save(reportBillboard);
    } catch (error) {
      throw error;
    }
  }

  //Update a report billboard
  async updateReportBillboard(id: number, data: UpdateReportBillboard) {
    try {
      let reportBillboard = await this.findReportBillboardById(id);
      if (!reportBillboard) {
        throw new Error('Report billboard not found');
      }
      reportBillboard = { ...reportBillboard, ...data };
      return await this.reportBillboardRepository.save(reportBillboard);
    } catch (error) {
      throw error;
    }
  }

  //Soft delete a report billboard
  async removeReportBillboard(id: number) {
    try {
      const reportBillboard = await this.findReportBillboardById(id);
      if (!reportBillboard) {
        throw new Error('Report billboard not found');
      }
      return await this.reportBillboardRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  //Restore a report billboard
  async restoreReportBillboard(id: number) {
    try {
      return await this.reportBillboardRepository.restore(id);
    } catch (error) {
      throw error;
    }
  }
}
