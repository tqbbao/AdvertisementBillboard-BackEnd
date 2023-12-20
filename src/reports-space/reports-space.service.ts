import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportSpace } from 'src/entity/reportSpace.entity';
import { Repository } from 'typeorm';
import { CreateReportSpaceDto } from './dto/create-reportSpace.dto';
import { UpdateReportSpaceDto } from './dto/update-reportSpace.dto';

@Injectable()
export class ReportsSpaceService {
  constructor(
    @InjectRepository(ReportSpace)
    private readonly reportSpaceRepository: Repository<ReportSpace>,
  ) {}

  //Find report space by id
  async findReportSpaceById(id: number) {
    return await this.reportSpaceRepository.findOne({
      where: { id: id },
      relations: {
        formReport: true,
        space: true,
      },
    });
  }

  //Create a new report space
  async createReportSpace(data: CreateReportSpaceDto) {
    try {
      const reportSpace = this.reportSpaceRepository.create(data);
      return await this.reportSpaceRepository.save(reportSpace);
    } catch (error) {
      throw error;
    }
  }

  //Update a report space
  async updateReportSpace(id: number, data: UpdateReportSpaceDto) {
    try {
      let reportSpace = await this.findReportSpaceById(id);
      if (!reportSpace) {
        throw new Error('Report space not found');
      }
      reportSpace = { ...reportSpace, ...data };
      return await this.reportSpaceRepository.save(reportSpace);
    } catch (error) {
      throw error;
    }
  }

  //Soft delete a report space
  async removeReportSpace(id: number) {
    try {
      const reportSpace = await this.findReportSpaceById(id);
      if (!reportSpace) {
        throw new Error('Report space not found');
      }
      return await this.reportSpaceRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  //Restore a report space
  async restoreReportSpace(id: number) {
    try {
      return await this.reportSpaceRepository.restore(id);
    } catch (error) {
      throw error;
    }
  }
}
