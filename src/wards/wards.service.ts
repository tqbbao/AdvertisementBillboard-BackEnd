import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wards } from 'src/entity/wards.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Wards)
    private wardRepository: Repository<Wards>,
  ) {}
  //Find by IdGeo
  async findByIdGeo(idGeo: string) {
    return await this.wardRepository.find({
      where: {
        idGeo: idGeo,
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
