// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mysql from 'mysql2/promise';

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: 'infradb.cgdk6iucqdcc.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: '00000000',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS infradb`);
  await connection.end();
}

async function bootstrap() {
  await createDatabaseIfNotExists();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['https://codingbyohj.com', 'https://api.codingbyohj.com'],
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
