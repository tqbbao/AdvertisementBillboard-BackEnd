import { Test, TestingModule } from '@nestjs/testing';
import { ReportsSpaceService } from './reports-space.service';

describe('ReportsSpaceService', () => {
  let service: ReportsSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsSpaceService],
    }).compile();

    service = module.get<ReportsSpaceService>(ReportsSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
