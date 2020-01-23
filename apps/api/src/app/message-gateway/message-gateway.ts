import {
    OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessageGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;

    async handleConnection() {
        // Notify connected clients of current users
        this.server.emit('init', 'connected');
    }

    async handleDisconnect() {
        // Notify connected clients of current users
        this.server.emit('close', 'disconected');
    }

    @SubscribeMessage('data')
    async onChat(client, message) {
        client.message.emit('data', message);
    }
}
