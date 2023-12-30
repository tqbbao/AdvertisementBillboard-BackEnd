import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationTypes } from 'src/entity/location-types.entity';
import { CreateLocationTypesDto } from './dto/create-location-types.dto';

@Injectable()
export class LocationTypesService {
  constructor(
    @InjectRepository(LocationTypes)
    private locationTypesRepository: Repository<LocationTypes>,
  ) {}

  //find all
  async findAll() {
    return await this.locationTypesRepository.find();
  }

  // Find by id
  async findById(id: number) {
    return await this.locationTypesRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // Create
  async create(data: CreateLocationTypesDto) {
    try {
      const locationTypes = await this.locationTypesRepository.create(data);
      return await this.locationTypesRepository.save(locationTypes);
    } catch (error) {
      throw error;
    }
  }

  //Update
  async update(id: number, data: CreateLocationTypesDto) {
    return await this.locationTypesRepository.update(id, data);
  }

  // soft Delete
  async remove(id: number) {
    return await this.locationTypesRepository.softDelete(id);
  }
}
