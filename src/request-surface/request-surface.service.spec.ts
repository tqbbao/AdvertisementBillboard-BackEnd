import { Test, TestingModule } from '@nestjs/testing';
import { RequestSurfaceService } from './request-surface.service';

describe('RequestSurfaceService', () => {
  let service: RequestSurfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSurfaceService],
    }).compile();

    service = module.get<RequestSurfaceService>(RequestSurfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
