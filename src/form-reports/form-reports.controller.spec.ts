import { Test, TestingModule } from '@nestjs/testing';
import { FormReportsController } from './form-reports.controller';

describe('FormReportsController', () => {
  let controller: FormReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormReportsController],
    }).compile();

    controller = module.get<FormReportsController>(FormReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
