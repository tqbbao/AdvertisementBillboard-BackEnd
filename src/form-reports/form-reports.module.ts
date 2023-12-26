import { Module } from '@nestjs/common';
import { FormReportsController } from './form-reports.controller';
import { FormReportsService } from './form-reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormReport } from 'src/entity/form-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormReport])],
  controllers: [FormReportsController],
  providers: [FormReportsService]
})
export class FormReportsModule {}
