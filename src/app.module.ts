import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger.middleware';
// import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      // .exclude({ path: 'cats', method: RequestMethod.GET })
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
