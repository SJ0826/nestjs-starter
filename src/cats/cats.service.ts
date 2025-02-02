import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';

@Injectable() // 메타데이터. Nest Ioc 컨테이너에 의해 관리함.
export class CatsService {
  private readonly cats: Cat[] = []

  create(cat: Cat) {
    this.cats.push(cat)
  }

  findAll(): Cat[] {
    return this.cats;
  }
}