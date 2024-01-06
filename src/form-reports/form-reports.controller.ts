import { Controller, Get, HttpCode } from '@nestjs/common';
import { FormReportsService } from './form-reports.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('form-reports')
@Controller('form-reports')
export class FormReportsController {
    constructor(
        private formReportsService: FormReportsService,
    ) {}

    //find all form reports
    @HttpCode(200)
    @Get()
    async findAll() {
        return await this.formReportsService.findAll();
    }
}
