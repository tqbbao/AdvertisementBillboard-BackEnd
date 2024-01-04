import { Test, TestingModule } from '@nestjs/testing';
import { FormAdvertisingService } from './form-advertising.service';

describe('FormAdvertisingService', () => {
  let service: FormAdvertisingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormAdvertisingService],
    }).compile();

    service = module.get<FormAdvertisingService>(FormAdvertisingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
