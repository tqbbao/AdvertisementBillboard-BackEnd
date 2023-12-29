import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormAdvertising } from 'src/entity/form-advertising.entity';
import { Repository } from 'typeorm';

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
}
