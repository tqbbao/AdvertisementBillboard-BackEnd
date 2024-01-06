import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from './dto/pagination';

@ApiTags('districts')
@Controller('districts')
export class DistrictsController {
  constructor(private districtService: DistrictsService) {}

  // @Get('/name')
  // async findByName(@Query('name') name: string) {
  //   return await this.districtService.findByName(name);
  // }

  
  //Find all districts
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách quận' })
  @ApiResponse({ status: 200, description: 'Danh sách quận' })
  @Get()
  async findAll() {
    return await this.districtService.findAll();
  }
  //Find all districts by pagination
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách quận theo phân trang' })
  @ApiQuery({ name: 'page', description: 'Số trang', required: false })
  @ApiQuery({ name: 'limit', description: 'Số lượng quận', required: false })
  @ApiResponse({ status: 200, description: 'Danh sách quận theo phân trang' })
  @Get('/pagination')
  async findAllByPagination(@Query() pagination: Pagination) {
    return await this.districtService.findAllByPagination(pagination);
  }
  
  //Find by id
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách quận theo id' })
  @ApiParam({ name: 'id', description: 'id quận', required: true })
  @ApiResponse({ status: 200, description: 'Danh sách quận theo id' })
  @Get('/:id')
  async findById(@Param('id') id: number) {
    return await this.districtService.findById(id)
;
  }

}