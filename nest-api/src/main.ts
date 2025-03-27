// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mysql from 'mysql2/promise';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

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

  // ✅ 자동 마이그레이션 실행
  try {
    console.log('🔄 Running Prisma migration...');
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    console.log('✅ Migration complete:\n', stdout);
    if (stderr) console.error('⚠️ Migration warnings:\n', stderr);
  } catch (err) {
    console.error('❌ Migration failed:', err);
  }

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['https://codingbyohj.com', 'https://api.codingbyohj.com'],
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
