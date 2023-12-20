import { Test, TestingModule } from '@nestjs/testing';
import { ReportsSpaceController } from './reports-space.controller';

describe('ReportsSpaceController', () => {
  let controller: ReportsSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsSpaceController],
    }).compile();

    controller = module.get<ReportsSpaceController>(ReportsSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
