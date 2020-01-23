import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageGatewayModule } from './message-gateway/message-gateway.module';

@Module({
    imports: [MessageGatewayModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
