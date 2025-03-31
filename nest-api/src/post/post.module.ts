import { Module } from '@nestjs/common';
import { PostController } from './post.controller'; // ✅ 반드시 존재해야 함
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PostController], // ✅ 반드시 Controller여야 함
  providers: [PostService, PrismaService],
})
export class PostsModule {}
