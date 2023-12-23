import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wards } from 'src/entity/wards.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Wards)
    private wardRepository: Repository<Wards>,
  ) {}

  //Find by name
  async findByName(name: string) {
    return await this.wardRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  //Find by id
  async findById(id: number) {
    return await this.wardRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        district: true,
      },
    });
  }

  //Find by district id
  async findByDistrictId(districtId: number) {
    return await this.wardRepository.find({
      where: {
        district: { id: districtId },
      },
      relations: {
        district: true,
      },
    });
  }
}
