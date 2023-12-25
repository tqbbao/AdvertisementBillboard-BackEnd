import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportSpace } from 'src/entity/reportSpace.entity';
import { Repository } from 'typeorm';
import { CreateReportSpaceDto } from './dto/create-reportSpace.dto';
import { UpdateReportSpaceDto } from './dto/update-reportSpace.dto';
import { ReportState } from 'src/common/enums/report-state.enum';

@Injectable()
export class ReportsSpaceService {
  constructor(
    @InjectRepository(ReportSpace)
    private readonly reportSpaceRepository: Repository<ReportSpace>,
  ) {}

  //Find all report spaces
  async findAllReportSpaces() {
    return await this.reportSpaceRepository.find({
      relations: {
        formReport: true,
        space: true,
      },
    });
  }

  //Find all report spaces by space district id
  async findAllReportSpacesBySpaceDistrictId(spaceDistrictId: number) {
    return await this.reportSpaceRepository.find({
      where: {
        space: { district: { id: spaceDistrictId } },
      },
      relations: {
        formReport: true,
        space: true,
      },
    });
  }

  //Find all report spaces by ward id and space district id
  async findAllReportSpacesByWardIdAndSpaceDistrictId(
    wardId: number,
    spaceDistrictId: number,
  ) {
    return await this.reportSpaceRepository.find({
      where: {
        space: { ward: { id: wardId, district: { id: spaceDistrictId } } },
      },
      relations: {
        formReport: true,
        space: true,
      },
    });
  }

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

  //accept report space
  async acceptReportSpace(id: number) {
    try {
      const reportSpace = await this.findReportSpaceById(id);
      if (!reportSpace) {
        throw new Error('Report space not found');
      }
      await this.reportSpaceRepository.update(id, {
        state: ReportState.PROCESSED,
      });
    } catch (error) {
      throw error;
    }
  }
}
