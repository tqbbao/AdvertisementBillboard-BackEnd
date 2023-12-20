import { Module } from '@nestjs/common';
import { ReportsSurfaceController } from './reports-surface.controller';
import { ReportsSurfaceService } from './reports-surface.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSurface } from 'src/entity/reportSurface.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportSurface])],
  controllers: [ReportsSurfaceController],
  providers: [ReportsSurfaceService],
})
export class ReportsSurfaceModule {}
