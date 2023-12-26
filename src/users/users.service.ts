import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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

  private async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  //Create user
  async create(data: CreateUserDto) {
    try {
      const hashPassword = await this.hashPassword(data.password);
      data = { ...data, password: hashPassword };

      const user = await this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  //Update user
  async update(id: number, data: UpdateUserDto) {
    try {
      let user = await this.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      user = { ...user, ...data };
      console.log(user);
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
    const hashPassword = await this.hashPassword(password);

    if (!users) {
      throw new UnauthorizedException('User not found');
    }
    await this.userRepository.update(id, { password: hashPassword });
    return {
      message: 'Password changed successfully',
    };
  }
}
