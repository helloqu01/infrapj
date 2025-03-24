import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://my-next-app-bucket-e57x1l.s3-website.ap-northeast-2.amazonaws.com'], // Next.js 개발 서버 주소
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();