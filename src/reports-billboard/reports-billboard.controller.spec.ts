import { Test, TestingModule } from '@nestjs/testing';
import { ReportsBillboardController } from './reports-billboard.controller';

describe('ReportsBillboardController', () => {
  let controller: ReportsBillboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsBillboardController],
    }).compile();

    controller = module.get<ReportsBillboardController>(ReportsBillboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
