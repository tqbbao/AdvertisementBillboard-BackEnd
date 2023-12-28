import { Test, TestingModule } from '@nestjs/testing';
import { ReportsSurfaceService } from './reports-surface.service';

describe('ReportsSurfaceService', () => {
  let service: ReportsSurfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsSurfaceService],
    }).compile();

    service = module.get<ReportsSurfaceService>(ReportsSurfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
