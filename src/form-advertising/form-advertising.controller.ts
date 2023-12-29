import { Controller, Get } from '@nestjs/common';
import { FormAdvertisingService } from './form-advertising.service';

@Controller('form-advertising')
export class FormAdvertisingController {
  constructor(private formAdvertisingService: FormAdvertisingService) {}

  //Find all
  @Get()
  async findAll() {
    return await this.formAdvertisingService.findAll();
  }
}
