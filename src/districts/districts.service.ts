import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Districts } from 'src/entity/districts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(Districts)
    private districtRepository: Repository<Districts>,
  ) {}

  //Find by name
  async findByName(name: string) {
    return await this.districtRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  //Find by id
  async findById(id: number) {
    return await this.districtRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  //Find all districts
  async findAll() {
    return await this.districtRepository.find();
  }
}
