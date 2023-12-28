import { Test, TestingModule } from '@nestjs/testing';
import { SurfacesController } from './surfaces.controller';

describe('SurfacesController', () => {
  let controller: SurfacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurfacesController],
    }).compile();

    controller = module.get<SurfacesController>(SurfacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
