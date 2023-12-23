import { Module } from '@nestjs/common';
import { ReverseGeocodingController } from './reverse-geocoding.controller';
import { ReverseGeocodingService } from './reverse-geocoding.service';
import { HttpModule } from '@nestjs/axios';
import { WardsModule } from 'src/wards/wards.module';

@Module({
  imports: [HttpModule,WardsModule],
  controllers: [ReverseGeocodingController],
  providers: [ReverseGeocodingService, ],
  exports: [ReverseGeocodingService]
})
export class ReverseGeocodingModule {}
