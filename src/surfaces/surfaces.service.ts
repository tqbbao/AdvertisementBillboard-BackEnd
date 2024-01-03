import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Surfaces } from 'src/entity/surfaces.entity';
import { Repository } from 'typeorm';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';
import { removeFile } from 'src/common/multer/config';
import { PaginationSurface } from './dto/pagination';

@Injectable()
export class SurfacesService {
  constructor(
    @InjectRepository(Surfaces)
    private surfacesRepository: Repository<Surfaces>,
  ) {}

  

  //Find all surfaces
  async findAll() {
    return this.surfacesRepository.find({
      relations: {
        space: true,
        surfaceType: true,
      },
    });
  }

  //Find all surfaces with pagination
  async findAllWithPagination(pagination: PaginationSurface) {
    // Giới hạn 1 page bao nhiêu item
    const limit = Number(pagination.limit) || 10;
    // Số page hiện tại
    const page = Number(pagination.page) || 1;
    // Tính skip bao nhiêu item
    const skip = (page - 1) * limit;

    //

    const [data, total] = await this.surfacesRepository.findAndCount({
      relations: {
        space: true,
        surfaceType: true,
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
        total,
        page,
        limit,
        lastPage,
        nextPage,
        prevPage,
      },
    };
  }

  //Find all by area
  async findAllByArea(pagination: PaginationSurface) {
    console.log(pagination);
    const ward = pagination.ward;
    const district = pagination.district;

    return this.surfacesRepository.find({
      where: {
        space: {
          district: { id: district },
          ward: { id: ward },
        },
      },
      relations: ['space', 'surfaceType'],
    });
  }

  //Find all surfaces by space id
  async findAllBySpaceId(spaceId: number) {
    return this.surfacesRepository.find({
      where: {
        space: { id: spaceId },
      },
      relations: {
        space: true,
        surfaceType: true,
      },
    });
  }

  //Find by id
  async findById(id: number) {
    return this.surfacesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        space: true,
        surfaceType: true,
      },
    });
  }

  //Create a new surface
  async createSurface(data: CreateSurfaceDto) {
    try {
      const surface = await this.surfacesRepository.create(data);
      return await this.surfacesRepository.save(surface);
    } catch (error) {
      throw error;
    }
  }

  //Update a surface
  async updateSurface(id: number, data: UpdateSurfaceDto) {
    try {
      let surface = await this.findById(id);
      if (!surface) {
        throw new Error('Surface not found');
      }
      removeFile(surface.imgUrl);
      surface = { ...surface, ...data };
      return await this.surfacesRepository.save(surface);
    } catch (error) {
      throw error;
    }
  }

  //Soft Delete a surface (Remove)
  async removeSurface(id: number) {
    try {
      const surface = await this.findById(id);
      if (!surface) {
        throw new Error('Surface not found');
      }
      return await this.surfacesRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  //Restore a surface
  async restoreSurface(id: number) {
    try {
      return await this.surfacesRepository.restore(id);
    } catch (error) {
      throw error;
    }
  }
}
