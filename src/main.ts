import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 글로벌 미들웨어
  // app.use(logger)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
