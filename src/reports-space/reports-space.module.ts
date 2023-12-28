import { Module } from '@nestjs/common';
import { ReportsSpaceController } from './reports-space.controller';
import { ReportsSpaceService } from './reports-space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSpace } from 'src/entity/reportSpace.entity';
import { RequestEditSpace } from 'src/entity/requestEditSpace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportSpace, RequestEditSpace])],
  controllers: [ReportsSpaceController],
  providers: [ReportsSpaceService],
  exports: [ReportsSpaceService],
})
export class ReportsSpaceModule {}
