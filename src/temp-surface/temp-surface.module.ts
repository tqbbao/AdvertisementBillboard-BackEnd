import { Module } from '@nestjs/common';
import { TempSurfaceController } from './temp-surface.controller';
import { TempSurfaceService } from './temp-surface.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempSurface } from 'src/entity/tempSurface.entity';
import { SurfacesModule } from 'src/surfaces/surfaces.module';

@Module({
  imports: [SurfacesModule,TypeOrmModule.forFeature([TempSurface])],
  controllers: [TempSurfaceController],
  providers: [TempSurfaceService]
})
export class TempSurfaceModule {}
