import { Test, TestingModule } from '@nestjs/testing';
import { ReportsBillboardService } from './reports-billboard.service';

describe('ReportsBillboardService', () => {
  let service: ReportsBillboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsBillboardService],
    }).compile();

    service = module.get<ReportsBillboardService>(ReportsBillboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
