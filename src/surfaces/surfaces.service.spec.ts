import { Test, TestingModule } from '@nestjs/testing';
import { SurfacesService } from './surfaces.service';

describe('SurfacesService', () => {
  let service: SurfacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurfacesService],
    }).compile();

    service = module.get<SurfacesService>(SurfacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
