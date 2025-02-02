import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
// import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CatsModule],
  providers: [
    // 전역 범위 필터는 기능 모듈의 컨텍스트 외부에서 수행되기 때문에 종속성을 주입할 수 없다. 모든 모듈에 직접 전역 범위 필터를 등록한다.
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      // .exclude({ path: 'cats', method: RequestMethod.GET })
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
