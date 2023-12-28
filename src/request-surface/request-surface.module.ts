import { Module } from '@nestjs/common';
import { RequestSurfaceController } from './request-surface.controller';
import { RequestSurfaceService } from './request-surface.service';
import { ReportsSurfaceModule } from 'src/reports-surface/reports-surface.module';

@Module({
  controllers: [RequestSurfaceController],
  providers: [RequestSurfaceService]
})
export class RequestSurfaceModule {}
