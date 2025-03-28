import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const customToken = req.headers['x-auth-token'];
    if (customToken && !req.headers['authorization']) {
      req.headers['authorization'] = Array.isArray(customToken)
        ? customToken[0]
        : customToken;
    }
    next();
  }
}
