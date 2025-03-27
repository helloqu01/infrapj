import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mysql from 'mysql2/promise';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function createDatabaseIfNotExists() {
  try {
    console.log('📦 Checking if DB exists...');
    const connection = await mysql.createConnection({
      host: 'infradb.cgdk6iucqdcc.us-east-1.rds.amazonaws.com',
      port: 3306,
      user: 'admin',
      password: '00000000',
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS infradb`);
    await connection.end();
    console.log('✅ DB checked/created.');
  } catch (err) {
    console.error('❌ Failed to create database:', err);
    process.exit(1); // 앱 중지
  }
}

async function runPrismaMigrate() {
  try {
    console.log('🚀 Running Prisma migrate...');
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    console.log('✅ Migration success:\n', stdout);
    if (stderr) console.warn('⚠️ Migration warnings:\n', stderr);
  } catch (err) {
    console.error('❌ Prisma migration failed:\n', err);
    process.exit(1); // 앱 중지
  }
}

async function bootstrap() {
  await createDatabaseIfNotExists();
  await runPrismaMigrate();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['https://codingbyohj.com', 'https://api.codingbyohj.com'],
    credentials: true,
  });

  await app.listen(8080);
  console.log('✅ NestJS app running on port 8080');
}

bootstrap();
