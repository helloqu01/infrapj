// src/types/express/index.d.ts
import 'express';

declare module 'express' {
  export interface Request {
    user?: {
      sub: number;
      email: string;
      name?: string;
      role?: string;
    };
  }
}
