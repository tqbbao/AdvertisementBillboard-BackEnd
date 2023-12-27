import { Module } from '@nestjs/common';
import { RequestSurfaceController } from './request-surface.controller';
import { RequestSurfaceService } from './request-surface.service';

@Module({
  controllers: [RequestSurfaceController],
  providers: [RequestSurfaceService]
})
export class RequestSurfaceModule {}
