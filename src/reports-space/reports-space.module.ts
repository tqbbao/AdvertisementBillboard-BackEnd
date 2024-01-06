import { Module } from '@nestjs/common';
import { ReportsSpaceController } from './reports-space.controller';
import { ReportsSpaceService } from './reports-space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSpace } from 'src/entity/reportSpace.entity';
import { RequestEditSpace } from 'src/entity/requestEditSpace.entity';
import { EventsModule } from 'src/event/events.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([ReportSpace, RequestEditSpace])],
  controllers: [ReportsSpaceController],
  providers: [ReportsSpaceService],
  exports: [ReportsSpaceService],
})
export class ReportsSpaceModule {}
