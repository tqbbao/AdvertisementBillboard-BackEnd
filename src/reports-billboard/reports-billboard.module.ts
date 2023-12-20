import { Module } from '@nestjs/common';
import { ReportsBillboardController } from './reports-billboard.controller';
import { ReportsBillboardService } from './reports-billboard.service';
import { ReportBillboard } from 'src/entity/reportBillboard.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReportBillboard])],
  controllers: [ReportsBillboardController],
  providers: [ReportsBillboardService]
})
export class ReportsBillboardModule {}
