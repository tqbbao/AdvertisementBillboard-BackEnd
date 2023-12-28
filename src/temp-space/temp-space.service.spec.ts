import { Test, TestingModule } from '@nestjs/testing';
import { TempSpaceService } from './temp-space.service';

describe('TempSpaceService', () => {
  let service: TempSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempSpaceService],
    }).compile();

    service = module.get<TempSpaceService>(TempSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
