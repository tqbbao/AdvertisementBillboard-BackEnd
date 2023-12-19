import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Surfaces } from 'src/entity/surfaces.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurfacesService {
  constructor(
    @InjectRepository(Surfaces)
    private surfacesRepository: Repository<Surfaces>,
  ) {}

  async findAll() {
    return await this.surfacesRepository.find({
      relations: {
        space: true,
        surfaceType: true,
      }
    });
  }
}
