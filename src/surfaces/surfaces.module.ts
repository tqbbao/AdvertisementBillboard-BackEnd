import { Module } from '@nestjs/common';
import { SurfacesController } from './surfaces.controller';
import { SurfacesService } from './surfaces.service';
import { Surfaces } from 'src/entity/surfaces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spaces } from 'src/entity/spaces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Surfaces, Spaces])],
  controllers: [SurfacesController],
  providers: [SurfacesService],
  exports: [SurfacesService],
})
export class SurfacesModule {}
