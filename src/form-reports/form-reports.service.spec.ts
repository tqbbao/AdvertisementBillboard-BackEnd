import { Test, TestingModule } from '@nestjs/testing';
import { FormReportsService } from './form-reports.service';

describe('FormReportsService', () => {
  let service: FormReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormReportsService],
    }).compile();

    service = module.get<FormReportsService>(FormReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
