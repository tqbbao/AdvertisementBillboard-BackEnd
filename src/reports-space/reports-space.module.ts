import { Module } from '@nestjs/common';
import { ReportsSpaceController } from './reports-space.controller';
import { ReportsSpaceService } from './reports-space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSpace } from 'src/entity/reportSpace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportSpace])],
  controllers: [ReportsSpaceController],
  providers: [ReportsSpaceService]
})
export class ReportsSpaceModule {}
