import { Module } from '@nestjs/common';
import { SurfacesController } from './surfaces.controller';
import { SurfacesService } from './surfaces.service';

@Module({
  controllers: [SurfacesController],
  providers: [SurfacesService]
})
export class SurfacesModule {}
