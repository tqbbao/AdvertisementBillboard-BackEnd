import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { FormReportsService } from './form-reports.service';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateFormReportsDto } from './dto/create-form-reports.dto';

@ApiTags('form-reports')
@Controller('form-reports')
export class FormReportsController {
    constructor(
        private formReportsService: FormReportsService,
    ) {}

    //find all form reports
    @HttpCode(200)
    @ApiOperation({ summary: 'Danh sách form reports' })
    @Get()
    async findAll() {
        return await this.formReportsService.findAll();
    }

    // Find by id
    @Get(':id')
    @ApiOperation({ summary: 'Chi tiết form reports' })
    @HttpCode(200)
    @ApiQuery({ name: 'id', type: Number, required: true })
    async findById(@Param('id') id: number) {
        return await this.formReportsService.findById(id);
    }

    // Create
    @Post()
    @ApiOperation({ summary: 'Tạo form reports' })
    @HttpCode(201)
    @ApiBody({ type: CreateFormReportsDto })
    async create(@Body() data: CreateFormReportsDto) {
        return await this.formReportsService.create(data);
    }

    // Update
    @Put(':id')
    @ApiOperation({ summary: 'Cập nhật form reports' })
    @HttpCode(200)
    @ApiQuery({ name: 'id', type: Number, required: true })
    async update(@Param('id') id: number, @Body() data: CreateFormReportsDto) {
        return await this.formReportsService.update(id, data);
    }

    // soft Delete
    @Delete(':id')
    @ApiOperation({ summary: 'Xóa form reports' })
    @HttpCode(200)
    @ApiQuery({ name: 'id', type: Number, required: true })
    async remove(@Param('id') id: number) {
        return await this.formReportsService.remove(id);
    }
}
