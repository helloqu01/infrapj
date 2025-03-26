// main.ts (Nest.js 설정)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 모든 엔드포인트에 '/api' 프리픽스 적용
  app.setGlobalPrefix('api');

  app.enableCors({
    // origin: ['http://my-next-app-bucket-e57x1l.s3-website.ap-northeast-2.amazonaws.com'], // S3에서 호스팅하는 프론트엔드 URL
    origin: ['https://codingbyohj.com', 'https://api.codingbyohj.com'],
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
