import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/constants/jwtPayload';
import { UserRole } from 'src/common/enums/user-role.enum';
import { SignInUserDto } from './dto/signIn.dto';
import * as phoneToken from 'generate-sms-verification-code';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import * as fs from 'fs';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordWithOtpDto } from './dto/resetPasswordWithOtp.dto';
import e from 'express';
import { Districts } from 'src/entity/districts.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private mailerService: MailerService,
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

  async updateOtpById(id: number, otp: string) {
    await this.userRepository.update({ id: id }, { otp: otp });
  }

  async generateToken(payload: {
    role: UserRole;
    username: string;
    sub: number;
    districtId: number;
    wardId: number;
  }) {
    const jwtPayload: JwtPayload = {
      username: payload.username,
      sub: payload.sub,
      role: payload.role,
      districtId: payload.districtId,
      wardId: payload.wardId,
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
  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const Otp = phoneToken(6);
    const salt = await bcrypt.genSalt(10);
    const hashOtp = await bcrypt.hash(Otp, salt);

    await this.updateOtpById(user.id, hashOtp);

    const htmlFilePath = path.join(
      __dirname,
      '../../src/templates/email/send-otp.html',
    );
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    const emailData = {
      name: user.name,
      otpCode: Otp, // Replace this with your actual OTP code
      logo5: 'logo5',
    };
    for (const key in emailData) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      htmlContent = htmlContent.replace(regex, emailData[key]);
    }

    await this.mailerService.sendMail({
      to: `${user.email}`, // Địa chỉ email người nhận
      subject: 'Subject of the Email', // Tiêu đề của email
      // html: `<p>Dear ${user.name},</p>
      // <p>You have selected <a href="mailto:xxxxx@gmail.com">xxxxx@gmail.com</a> as your new Apple ID email address. To verify this email address belongs to you, enter the code below on the Apple ID website, verification page:</p>
      // <p><strong>${Otp}</strong></p>
      // <p>This code will expire three hours after this email was sent.</p>
      // <p><em>Why you received this email.</em><br/>
      // Apple requires verification whenever an email address is selected as an Apple ID.</p>
      // <p>If you did not make this request, you can ignore this email or report it to Apple Support.</p>
      // `, // Nội dung của email (HTML)
      html: htmlContent,
      attachments: [
        {
          filename: 'image-5.png',
          path: 'src/templates/images/image-5.png',
          cid: 'logo5',
        },
      ],
    });
    return {
      message: 'Please check your email',
    };
  }

  async verifyOtp(otp: string, email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
        otp: Not(IsNull()),
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found or OTP is not valid');
    }
    const isVerify = await bcrypt.compare(otp, user.otp);
    if (!isVerify) {
      throw new UnauthorizedException('OTP is not valid');
    }

    await this.userRepository.update({ id: user.id }, { otp: null });

    return {
      message: 'OTP is valid',
    };
  }

  async resetPassword(password: string, email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const hashPassword = await this.hashPassword(password);
    await this.userRepository.update(
      { id: user.id },
      { password: hashPassword },
    );
    return {
      message: 'Reset password success',
    };
  }
  async resetPasswordWithOtp(query: ForgotPasswordDto, data: ResetPasswordWithOtpDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: query.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (user.otp === null || user.otp === undefined) {
      throw new UnauthorizedException('OTP is not valid');
    }

    const isVerify = await bcrypt.compare(data.otp, user.otp);
    if (!isVerify) {
      throw new UnauthorizedException('OTP is not valid');
    }

    await this.userRepository.update({ id: user.id }, { otp: null });

    const hashPassword = await this.hashPassword(data.password);
    await this.userRepository.update(
      { id: user.id },
      { password: hashPassword },
    );
    return {
      message: 'Reset password success',
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
      data.password.toString(),
      user.password.toString(),
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is not valid');
    }

    const payload = { role: user.role, username: user.username, sub: user.id, districtId: user.district.id, wardId: user.ward.id };
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
        districtId: verifyToken.districtId,
        wardId: verifyToken.wardId,
      };
      const { access_token, refresh_token } = await this.generateToken(payload);

      await this.updateRtByUsername(verifyToken.username, refresh_token);
      return { access_token, refresh_token };
    } catch (error) {
      throw new UnauthorizedException('1Refresh token is not valid');
    }
  }

  //Logout
  async logout(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    await this.userRepository.update({ id: id }, { refreshToken: null });
    return {
      message: 'Logout success',
    };
  }
}
