import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ReverseGeocodingService } from './reverse-geocoding.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reverse-geocoding')
@Controller('reverse-geocoding')
export class ReverseGeocodingController {
  constructor(
    private readonly reverseGeocodingService: ReverseGeocodingService,
  ) {}

  @HttpCode(200)
  @Get('/:lat,:long')
  async reverseGeocoding(
    @Param('lat') lat: number,
    @Param('long') long: number,
  ) {
    return await this.reverseGeocodingService.reverseGeocoding(lat, long);
  }
}
