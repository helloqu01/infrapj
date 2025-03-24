// main.ts (Nest.js 설정)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://my-next-app-bucket-e57x1l.s3-website.ap-northeast-2.amazonaws.com'], // S3에서 호스팅하는 프론트엔드 URL
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
