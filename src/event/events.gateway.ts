import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Logger, UseGuards, Controller } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WsJwtGuard } from 'src/guards/ws.guard';
import { ReportSpace } from 'src/entity/reportSpace.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

@WebSocketGateway(81, { cors: true, transports: ['websocket', 'polling'] })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private citizens = new Map<string, Socket>(); // Store citizen's socket sessions
  private officials = new Map<string, Socket>(); // Store official's socket sessions

  private logger: Logger = new Logger('AppGateWay');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  //@UseGuards(WsJwtGuard)
  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    await this.authSocket(client);

    if (client['user']) {
      console.log('socket', client['user']);
      this.officials.set(client.id, client);
    } else {
      this.citizens.set(client.id, client);
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    if (this.officials.has(client.id)) {
      this.officials.delete(client.id);
    }

    if (this.citizens.has(client.id)) {
      this.citizens.delete(client.id);
    }
  }

  public broadcastToCitizens(event: string, data: any) {
    if (this.citizens.size > 0) {
      for (const client of this.citizens.values()) {
        client.emit(event, data);
      }
    }
  }

  public broadcastToOfficials(event: string, data: any) {
    if (this.officials.size > 0) {
      for (const client of this.officials.values()) {
        client.emit(event, data);
      }
    }
  }

  public broadcastToDistrictWard(event: string, data: ReportSpace) {
    console.log(event, data);
    if (this.officials.size > 0) {
      for (const client of this.officials.values()) {
        this.logger.log(client['user']);

        if (client['user'].districtId === data.space.district.id) {
          //Gửi cho quận
          if (client['user'].wardId === null) {
            client.emit(event, data);
          } //Gửi cho phường 
          else if (client['user'].wardId === data.space.ward.id) {
            client.emit(event, data);
          }
        }
      }
    }
  }


  // if (
  //   client['user'].districtId &&
  //   data.space.district.id === client['user'].districtId
  // ) {
  //   client.emit(event, data);
  // }

  // if (
  //   client['user'].wardId &&
  //   data.space.ward.id === client['user'].wardId
  // ) {
  //   client.emit(event, data);
  // }

  async authSocket(client: Socket) {
    const token = this.extractTokenFromHeader(client.handshake?.headers);
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('AT_SECRET'),
        });

        client['user'] = payload;
      } catch (e) {
        console.log(e);
        throw new WsException('Invalid token.');
      }
    }
    return undefined;
  }

  extractTokenFromHeader(headers: any): string | undefined {
    //console.log('headers', headers);
    if (headers && headers.authorization) {
      const [type, token] = headers.authorization.split(' ');
      return type === 'Bearer' ? token : undefined;
    }

    return undefined;
  }
}