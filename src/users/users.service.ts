import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

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
  async update(id: number, data: UpdateUserDto) {
    try {
      console.log(data)
      let user = await this.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      user = { ...user, ...data };
      console.log(user)
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  //find by email
  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  //change password
  async changePassword(id: number, password: string) {
    const users = await this.findById(id);
    if (!users) {
      throw new UnauthorizedException('User not found');
    }
    await this.userRepository.update(id, { password: password });
    return {
      message: 'Password changed successfully',
    };
  }
}
