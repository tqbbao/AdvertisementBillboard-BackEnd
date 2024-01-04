import { Test, TestingModule } from '@nestjs/testing';
import { TempSpaceController } from './temp-space.controller';

describe('TempSpaceController', () => {
  let controller: TempSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempSpaceController],
    }).compile();

    controller = module.get<TempSpaceController>(TempSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
