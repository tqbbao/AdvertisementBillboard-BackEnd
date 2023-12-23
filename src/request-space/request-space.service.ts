import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEditSpace } from 'src/entity/requestEditSpace.entity';
import { Repository } from 'typeorm';
import { CreateRequestSpaceDto } from './dto/create-requestSpace.dto';

@Injectable()
export class RequestSpaceService {
  constructor(
    @InjectRepository(RequestEditSpace)
    private readonly requestEditSpaceRepository: Repository<RequestEditSpace>,
  ) {}

  //Create a new request edit space
  async createRequestEditSpace(data: CreateRequestSpaceDto) {
    try {
      const requestEditSpace = this.requestEditSpaceRepository.create(data);
      return await this.requestEditSpaceRepository.save(requestEditSpace);
    } catch (error) {
      throw error;
    }
  }

  //Find request edit space by id
  async findRequestEditSpaceById(id: number) {
    return await this.requestEditSpaceRepository.findOne({
      where: { id: id },
      relations: {
        formAdvertising: true,
        locationTypes: true,
        ward: true,
        district: true,
      },
    });
  }
}
