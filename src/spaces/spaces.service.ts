import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spaces } from 'src/entity/spaces.entity';
import { Repository } from 'typeorm';
import { Pagination } from './dto/pagination';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Spaces)
    private spacesRepository: Repository<Spaces>,
    private readonly httpService: HttpService,
  ) {}

  async reverseGeocoding(lat: number, long: number) {
    const data = await this.httpService
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1Ijoibmh1dHBoYW1kZXYiLCJhIjoiY2xvbGcwZm5sMG1lMDJpbnJuemNmYm1xYyJ9.w9hEet44dcjmTnu7LWUkWQ`,
      )
      .pipe(map((response) => response.data));
    return data;
  }

  async findAll(pagination: Pagination) {
    // Giới hạn 1 page bao nhiêu item
    const limit = Number(pagination.limit) || 10;
    // Số page hiện tại
    const page = Number(pagination.page) || 1;
    // Tính skip bao nhiêu item
    const skip = (page - 1) * limit;

    const [data, total] = await this.spacesRepository.findAndCount({
      relations: {
        formAdvertising: true,
        locationTypes: true,
      },
      take: limit,
      skip: skip,
    });

    // Tính số page cuối cùng
    const lastPage = Math.ceil(total / limit);
    // Tính next page
    const nextPage = page + 1 > lastPage ? null : page + 1;
    // Tính prev page
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

  //Find by (lat, long)
  async findByLatLong(lat: number, long: number) {
    return await this.spacesRepository.find({
      where: {
        latitude: lat,
        longtitude: long,
      },
      relations: {
        formAdvertising: true,
        locationTypes: true,
      },
    });
  }

  //Find by id
  async findById(id: number) {
    return await this.spacesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        formAdvertising: true,
        locationTypes: true,
      },
    });
  }

  //Create new space
  async createSpace(data: CreateSpaceDto) {
    try {
      const space = await this.spacesRepository.create(data);
      return await this.spacesRepository.save(space);
    } catch (error) {
      throw error;
    }
  }

  //Update space
  async updateSpace(id: number, data: UpdateSpaceDto) {
    try {
      let space = await this.findById(id);
      if (!space) {
        throw new Error('Space not found');
      }
      //space.lastUpdate = new Date();
      space = { ...space, ...data };
      return await this.spacesRepository.save(space);
    } catch (error) {
      throw error;
    }
  }

  //Soft Delete space (Remove)
  async removeSpace(id: number) {
    try {
      let space = await this.findById(id);
      if (!space) {
        throw new Error('Space not found');
      }
      return await this.spacesRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  //Restore space
  async restoreSpace(id: number) {
    try {
      return await this.spacesRepository.restore(id);
    } catch (error) {
      throw error;
    }
  }
}
