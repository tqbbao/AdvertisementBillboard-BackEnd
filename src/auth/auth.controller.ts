import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signIn.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//   @Post('signup')
//   async register(@Body() signUpData: SignUpUserDto) {
//     return await this.authService.signUp(signUpData);
//   }

  @Post('signin')
  async login(@CurrentUser() currentUser, @Body() data: SignInUserDto) {
    const { access_token, refresh_token, user } = await this.authService.signIn(data);
    return {
        access_token: access_token,
        refresh_token: refresh_token,
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        phone: user.phone,
        ward: user.ward,
        district: user.district,
    }

  }

  @Post('rt')
  async refreshToken(@Body() refreshToken: { refreshToken: string }) {
    return await this.authService.refreshToken(refreshToken.refreshToken);
  }
}
