import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFormAdvertisingDto } from './dto/create-form-advertising.dto';
import { FormAdvertisingService } from './form-advertising.service';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Http } from 'winston/lib/winston/transports';

@ApiTags('form-advertising')
@Controller('form-advertising')
export class FormAdvertisingController {
  constructor(private formAdvertisingService: FormAdvertisingService) {}

  //Find all
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách hình thức quảng cáo' })
  @ApiResponse({ status: 200, description: 'Danh sách hình thức quảng cáo' })
  @Get()
  async findAll() {
    return await this.formAdvertisingService.findAll();
  }

  //Find by id
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách hình thức quảng cáo theo id' })
  @ApiParam({ name: 'id', description: 'id hình thức quảng cáo', required: true })
  @ApiResponse({ status: 200, description: 'Danh sách hình thức quảng cáo theo id' })
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.formAdvertisingService.findById(id)
;
  }


  // Create
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new form advertising' })
  @ApiBody({ type: CreateFormAdvertisingDto })
  @ApiResponse({ status: 201, description: 'Form advertising created successfully' })
  @Post()
  async create(@Body() data: CreateFormAdvertisingDto) {
    return await this.formAdvertisingService.create(data);
  }


  //Update

  @ApiOperation({ summary: 'Update a form advertising by ID' })
  @ApiParam({ name: 'id', description: 'ID of the form advertising to update' })
  @ApiBody({ type: CreateFormAdvertisingDto })
  @ApiResponse({ status: 200, description: 'Form advertising updated successfully' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateFormAdvertisingDto) {
    return await this.formAdvertisingService.update(id, data);
  }



  @ApiOperation({ summary: 'Delete a form advertising by ID' })
  @ApiParam({ name: 'id', description: 'ID of the form advertising to delete' })
  @ApiResponse({ status: 200, description: 'Form advertising deleted successfully' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.formAdvertisingService.remove(id)
;
  }

}