import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { WardsService } from './wards.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('wards')
@Controller('wards')
export class WardsController {
  constructor(private wardService: WardsService) {}

  // @ApiOperation({ summary: 'Tìm phường theo tên' })
  // @ApiQuery({ name: 'name', description: 'Tên phường', required: true })
  @Get('/search/:id')
  async findByIdGeo(@Param('id') id: string) {
    return await this.wardService.findByIdGeo(id);
  }

  

  //Find by district id
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách phường theo id quận' })
  @Get('/district/:id')
  async findByDistrictId(@Param('id', ParseIntPipe) id: number) {
    return await this.wardService.findByDistrictId(id);
  }

  @HttpCode(200)
  //Find by id
  @ApiOperation({ summary: 'Danh sách phường theo id' })
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.wardService.findById(id);
  }
}
