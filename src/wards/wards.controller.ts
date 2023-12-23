import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { WardsService } from './wards.service';

@Controller('wards')
export class WardsController {
  constructor(private wardService: WardsService) {}

  //Find by name
  @Get()
  async findByName(@Query('name') name: string) {
    return await this.wardService.findByName(name);
  }

  //Find by district id
  @Get('/district/:id')
  async findByDistrictId(@Param('id', ParseIntPipe) id: number) {
    return await this.wardService.findByDistrictId(id);
  }
}
