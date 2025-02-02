import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

/*
* @Global
* 어디서나 사용하는 (ex. 데이터 베이스) provider를 제공하는 경우 전역으로 사용할 수 있다.
* */
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})

export class CatsModule {}
