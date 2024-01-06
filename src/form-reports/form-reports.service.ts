import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormReport } from 'src/entity/form-report.entity';
import { Repository } from 'typeorm';
import { CreateFormReportsDto } from './dto/create-form-reports.dto';

@Injectable()
export class FormReportsService {
  constructor(
    @InjectRepository(FormReport)
    private formReportRepository: Repository<FormReport>,
  ) {}

  //find all form reports
  async findAll() {
    return await this.formReportRepository.find();
  }

  // Find by id
  async findById(id: number) {
    return await this.formReportRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // Create
  async create(data: CreateFormReportsDto) {
    try {
      const formAdvertising = await this.formReportRepository.create(data);
      return await this.formReportRepository.save(formAdvertising);
    } catch (error) {
      throw error;
    }
  }

  //Update
  async update(id: number, data: CreateFormReportsDto) {
    return await this.formReportRepository.update(id, data);
  }

  // soft Delete
  async remove(id: number) {
    return await this.formReportRepository.softDelete(id);
  }
}
