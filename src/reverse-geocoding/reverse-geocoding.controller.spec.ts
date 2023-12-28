import { Test, TestingModule } from '@nestjs/testing';
import { ReverseGeocodingController } from './reverse-geocoding.controller';

describe('ReverseGeocodingController', () => {
  let controller: ReverseGeocodingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReverseGeocodingController],
    }).compile();

    controller = module.get<ReverseGeocodingController>(ReverseGeocodingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
