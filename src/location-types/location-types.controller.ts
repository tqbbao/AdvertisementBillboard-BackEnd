import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLocationTypesDto } from './dto/create-location-types.dto';
import { LocationTypesService } from './location-types.service';
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
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
@ApiTags('location-types')
@Controller('location-types')
export class LocationTypesController {
  constructor(private locationTypesService: LocationTypesService) {}

  //Find all
  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Get all location types' })
  @ApiResponse({ status: 200, description: 'Found all location types' })
  async findAll() {
    return await this.locationTypesService.findAll();
  }

  @HttpCode(200)
  //Find by id
  @Get(':id')
  @ApiOperation({ summary: 'Get a location type by ID' })
  @ApiParam({ name: 'id', description: 'ID of the location type' })
  @ApiResponse({ status: 200, description: 'Found location type by ID' })
  async findById(@Param('id') id: number) {
    return await this.locationTypesService.findById(id)
;
  }

  // Create
  @Post()
  @ApiOperation({ summary: 'Update a location type by ID' })
  @ApiParam({ name: 'id', description: 'ID of the location type to update' })
  @ApiBody({ type: CreateLocationTypesDto })
  @ApiResponse({ status: 200, description: 'Location type updated successfully'})
  async create(@Body() data: CreateLocationTypesDto) {
    return await this.locationTypesService.create(data);
  }

  //Update
  @Put(':id')
  @ApiOperation({ summary: 'Update a location type by ID' })
  @ApiParam({ name: 'id', description: 'ID of the location type to update' })
  @ApiBody({ type: CreateLocationTypesDto })
  @ApiResponse({ status: 200, description: 'Location type updated successfully' })
  async update(@Param('id') id: number, @Body() data: CreateLocationTypesDto) {
    return await this.locationTypesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location type by ID' })
  @ApiParam({ name: 'id', description: 'ID of the location type to delete' })
  @ApiResponse({ status: 200, description: 'Location type deleted successfully' })
  async remove(@Param('id') id: number) {
    return await this.locationTypesService.remove(id)
;
  }
}