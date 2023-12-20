import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Surfaces } from 'src/entity/surfaces.entity';
import { Repository } from 'typeorm';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';

@Injectable()
export class SurfacesService {
  constructor(
    @InjectRepository(Surfaces)
    private surfacesRepository: Repository<Surfaces>,
  ) {}

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
      surface = { ...surface, ...data };
      return await this.surfacesRepository.save(surface);
    } catch (error) {
      throw error;
    }
  }

  //Soft Delete a surface (Remove)
  async removeSurface(id: number) {
    try {
      let surface = await this.findById(id);
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
