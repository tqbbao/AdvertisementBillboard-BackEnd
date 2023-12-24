import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/constants/jwtPayload';
import { UserRole } from 'src/common/enums/user-role.enum';
import { SignInUserDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async updateRtById(id: number, refreshToken: string) {
    await this.userRepository.update(
      { id: id },
      { refreshToken: refreshToken },
    );
  }
  async updateRtByUsername(username: string, refreshToken: string) {
    await this.userRepository.update(
      { username: username },
      { refreshToken: refreshToken },
    );
  }

  async generateToken(payload: { role: UserRole; username: string; sub: number }) {
    const jwtPayload: JwtPayload = {
      username: payload.username,
      sub: payload.sub,
      role: payload.role,
    };

    const at = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: parseInt(this.configService.get('AT_TTL')),
      secret: this.configService.get<string>('AT_SECRET'),
    });

    const rt = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: parseInt(this.configService.get('RT_TTL')),
      secret: this.configService.get<string>('RT_SECRET'),
    });

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signIn(data: SignInUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: data.username },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compareSync(
      (data.password).toString(),
      (user.password).toString(),
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is not valid');
    }

    const payload = { role: user.role, username: user.username, sub: user.id };
    const { access_token, refresh_token } = await this.generateToken(payload);
    await this.updateRtById(user.id, refresh_token);
    return { access_token, refresh_token, user };
  }

  async refreshToken(refreshToken: string) {
    try {
      const verifyToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('RT_SECRET'),
      });
      const checkTokenExist = await this.userRepository.findOne({
        where: { refreshToken: refreshToken },
      });
      if (!checkTokenExist) {
        throw new UnauthorizedException('2Refresh token is not valid');
      }
      const payload = {
        username: verifyToken.username,
        sub: verifyToken.sub,
        role: verifyToken.role,
      };
      const { access_token, refresh_token } = await this.generateToken(payload);

      await this.updateRtByUsername(verifyToken.username, refresh_token);
      return { access_token, refresh_token };
    } catch (error) {
      throw new UnauthorizedException('1Refresh token is not valid');
    }
  }
}
