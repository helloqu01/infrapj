import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  imports: [],
  controllers: [AppController, HelloController], // HelloController 추가
  providers: [AppService, HelloService], // HelloService 추가
})
export class AppModule {}
