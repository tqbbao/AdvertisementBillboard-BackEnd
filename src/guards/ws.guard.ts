import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = this.extractTokenFromHeader(client.handshake?.headers);
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('AT_SECRET'),
        });
        client['user'] = payload;
      } catch (e) {
        throw new WsException('Invalid token.');
      }
    }

    return true;
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    if (headers && headers.authorization) {
      const [type, token] = headers.authorization.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
    return undefined;
  }
}
