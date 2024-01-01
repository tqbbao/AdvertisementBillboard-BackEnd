import { Test, TestingModule } from '@nestjs/testing';
import { TempSurfaceController } from './temp-surface.controller';

describe('TempSurfaceController', () => {
  let controller: TempSurfaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempSurfaceController],
    }).compile();

    controller = module.get<TempSurfaceController>(TempSurfaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
