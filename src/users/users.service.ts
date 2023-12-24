import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //Find all user
  async findAll() {
    return await this.userRepository.find();
  }

  //Find by id
  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  //Create user
  async create(user: User) {
    return await this.userRepository.save(user);
  }

  //Update user
  async update(id: number, user: User) {
    return await this.userRepository.update(id, user);
  }

  //find by email
  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
