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

@Controller('form-advertising')
export class FormAdvertisingController {
  constructor(private formAdvertisingService: FormAdvertisingService) {}

  //Find all
  @Get()
  async findAll() {
    return await this.formAdvertisingService.findAll();
  }

  //Find by id
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.formAdvertisingService.findById(id);
  }

  // Create
  @Post()
  async create(@Body() data: CreateFormAdvertisingDto) {
    return await this.formAdvertisingService.create(data);
  }

  //Update
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateFormAdvertisingDto) {
    return await this.formAdvertisingService.update(id, data);
  }
}
