import { Test, TestingModule } from '@nestjs/testing';
import { RequestSurfaceController } from './request-surface.controller';

describe('RequestSurfaceController', () => {
  let controller: RequestSurfaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestSurfaceController],
    }).compile();

    controller = module.get<RequestSurfaceController>(RequestSurfaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
