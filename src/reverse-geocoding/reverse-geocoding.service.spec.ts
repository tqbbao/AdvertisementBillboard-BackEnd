import { Test, TestingModule } from '@nestjs/testing';
import { ReverseGeocodingService } from './reverse-geocoding.service';

describe('ReverseGeocodingService', () => {
  let service: ReverseGeocodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReverseGeocodingService],
    }).compile();

    service = module.get<ReverseGeocodingService>(ReverseGeocodingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
