import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormReport } from 'src/entity/form-report.entity';
import { Repository } from 'typeorm';

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
}
