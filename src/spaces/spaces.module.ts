import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { Spaces } from 'src/entity/spaces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ReverseGeocodingService } from 'src/reverse-geocoding/reverse-geocoding.service';
import { ReverseGeocodingModule } from 'src/reverse-geocoding/reverse-geocoding.module';


@Module({
  imports: [TypeOrmModule.forFeature([Spaces]), ReverseGeocodingModule],

  controllers: [SpacesController],
  providers: [SpacesService,],
  exports: [SpacesService],
})
export class SpacesModule {}
