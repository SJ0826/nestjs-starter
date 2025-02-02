import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

//@Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request...');
//     next();
//   }
// }

// 미들웨어에 종속성이 필요없다면, 간단한 함수형 미들웨어를 사용 권장한다.
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}