import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessageGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;

    async handleConnection() {
        // Notify connected clients of current users
        this.server.emit('data', 'connected');
        console.log('fdfdfdfdf');
    }

    async handleDisconnect() {
        // Notify connected clients of current users
        this.server.emit('data', 'disconected');
        console.log('rerererer');
    }

    @SubscribeMessage('data')
    onChat(client, message) {
        console.log('data:', message);
        const event = 'data';
        const data = 'qwer';

        return of({ event, data }).pipe(delay(7000));
    }
}
