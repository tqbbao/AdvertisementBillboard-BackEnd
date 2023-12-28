import { Test, TestingModule } from '@nestjs/testing';
import { ReportsSurfaceController } from './reports-surface.controller';

describe('ReportsSurfaceController', () => {
  let controller: ReportsSurfaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsSurfaceController],
    }).compile();

    controller = module.get<ReportsSurfaceController>(ReportsSurfaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
