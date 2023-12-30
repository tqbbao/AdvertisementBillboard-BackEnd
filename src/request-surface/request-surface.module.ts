import { Module } from '@nestjs/common';
import { RequestSurfaceController } from './request-surface.controller';
import { RequestSurfaceService } from './request-surface.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEditSurface } from 'src/entity/requestEditSurface.entity';
import { ReportsSurfaceModule } from 'src/reports-surface/reports-surface.module';
import { SurfacesModule } from 'src/surfaces/surfaces.module';

@Module({
  imports: [SurfacesModule, ReportsSurfaceModule,TypeOrmModule.forFeature([RequestEditSurface])],
  controllers: [RequestSurfaceController],
  providers: [RequestSurfaceService]
})
export class RequestSurfaceModule {}
