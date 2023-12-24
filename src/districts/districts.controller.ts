import { Controller, Get, Param, Query } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('districts')
@Controller('districts')
export class DistrictsController {
  constructor(private districtService: DistrictsService) {}

  // @Get('/name')
  // async findByName(@Query('name') name: string) {
  //   return await this.districtService.findByName(name);
  // }

  //Find by id
  @Get('/:id')
  async findById(@Param('id') id: number) {
    return await this.districtService.findById(id);
  }

  //Find all districts
  @Get()
  async findAll() {
    return await this.districtService.findAll();
  }


}
