import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsJwtGuard } from 'src/guards/ws.guard';

@WebSocketGateway()
export class EventsGateway {
    private citizens = new Map<string, Socket>(); // Store citizen's socket sessions
    private officials = new Map<string, Socket>(); // Store official's socket sessions

    @UseGuards(WsJwtGuard)
    handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
        const user = client['user'];

        if (user) {
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
}
