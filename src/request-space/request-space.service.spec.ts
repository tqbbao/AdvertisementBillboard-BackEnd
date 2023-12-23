import { Test, TestingModule } from '@nestjs/testing';
import { RequestSpaceService } from './request-space.service';

describe('RequestSpaceService', () => {
  let service: RequestSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSpaceService],
    }).compile();

    service = module.get<RequestSpaceService>(RequestSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
