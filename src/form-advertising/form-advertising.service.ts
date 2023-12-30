import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormAdvertising } from 'src/entity/form-advertising.entity';
import { Repository } from 'typeorm';
import { CreateFormAdvertisingDto } from './dto/create-form-advertising.dto';

@Injectable()
export class FormAdvertisingService {
  constructor(
    @InjectRepository(FormAdvertising)
    private formAdvertisingRepository: Repository<FormAdvertising>,
  ) {}

  //find all
  async findAll() {
    return await this.formAdvertisingRepository.find();
  }

  // Find by id
  async findById(id: number) {
    return await this.formAdvertisingRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // Create
  async create(data: CreateFormAdvertisingDto) {
    try {
      const formAdvertising = await this.formAdvertisingRepository.create(data);
      return await this.formAdvertisingRepository.save(formAdvertising);
    } catch (error) {
      throw error;
    }
  }

  //Update
  async update(id: number, data: CreateFormAdvertisingDto) {
    return await this.formAdvertisingRepository.update(id, data);
  }

  // soft Delete
  async remove(id: number) {
    return await this.formAdvertisingRepository.softDelete(id);
  }
}
