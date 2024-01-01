import { Test, TestingModule } from '@nestjs/testing';
import { TempSurfaceService } from './temp-surface.service';

describe('TempSurfaceService', () => {
  let service: TempSurfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempSurfaceService],
    }).compile();

    service = module.get<TempSurfaceService>(TempSurfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
