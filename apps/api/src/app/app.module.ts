import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MessageGatewayModule } from './message-gateway/message-gateway.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [MessageGatewayModule, ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'zsszym'),
      })],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
   
}
