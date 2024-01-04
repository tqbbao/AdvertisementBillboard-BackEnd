import { Test, TestingModule } from '@nestjs/testing';
import { FormAdvertisingController } from './form-advertising.controller';

describe('FormAdvertisingController', () => {
  let controller: FormAdvertisingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormAdvertisingController],
    }).compile();

    controller = module.get<FormAdvertisingController>(FormAdvertisingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
