import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { FormReportsService } from './form-reports.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateFormReportsDto } from './dto/create-form-reports.dto';

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

    // Find by id
    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.formReportsService.findById(id);
    }

    // Create
    @Post()
    async create(@Body() data: CreateFormReportsDto) {
        return await this.formReportsService.create(data);
    }

    // Update
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: CreateFormReportsDto) {
        return await this.formReportsService.update(id, data);
    }

    // soft Delete
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.formReportsService.remove(id);
    }
}
