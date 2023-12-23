import { Test, TestingModule } from '@nestjs/testing';
import { RequestSpaceController } from './request-space.controller';

describe('RequestSpaceController', () => {
  let controller: RequestSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestSpaceController],
    }).compile();

    controller = module.get<RequestSpaceController>(RequestSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
