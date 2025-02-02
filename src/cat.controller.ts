import { Body, Controller, Get, Header, HttpCode, Param, Post, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  // @HttpCode(204) 상태코드 변경 가능
  // @Header('Cache-Control', 'no-store') 응답 헤더
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat';
  }

  @Get()
  async findAll(@Req() request: Request): Promise<any[]> {
    return [];
  }

 /*
 RxJs Observable 방식 - 스트림 기반 비동기 처리 (실시간 데이터, Websocket, 이벤트 처리에 최적)

 @Get()
  findAll(): Observable<any[]> {
    return of([]);
  }
*/

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
