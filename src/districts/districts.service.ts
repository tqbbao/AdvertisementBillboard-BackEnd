import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Districts } from 'src/entity/districts.entity';
import { Repository } from 'typeorm';
import { Pagination } from './dto/pagination';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(Districts)
    private districtRepository: Repository<Districts>,
  ) {}

  //Find by IdGeo
  async findByIdGeo(idGeo: string) {
    const district = await this.districtRepository.find({
      where: {
        idGeo: idGeo,
      },
    });
    return district;
  }

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


  //Find all districts by pagination
  async findAllByPagination(pagination: Pagination) {
    // Giới hạn 1 page bao nhiêu item
    const limit = Number(pagination.limit) || 10;
    // Số page hiện tại
    const page = Number(pagination.page) || 1;
    // Tính skip bao nhiêu item
    const skip = (page - 1) * limit;
    const [data, total] = await this.districtRepository.findAndCount({
      skip: skip,
      take: limit,
    });
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data,
      pagination: {
        totalPage: total,
        currentPage: page,
        lastPage,
        nextPage,
        prevPage,
      },
    };
  }
}
