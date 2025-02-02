import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req, UseFilters, UseGuards, UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { ForbiddenException } from '../forbidden.exception';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ValidationPipe } from '../validation.pipe';
import {  ParseIntPipe } from '../parse-int.pipe';
import { RoleGuard } from '../role.guard';
import { Roles } from '../roles.decorator';

@Controller('cats')
@UseGuards(RoleGuard)
export class CatsController {
  constructor(private catsService: CatsService) {
  }

  @Post()
  @Roles(['admin'])
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  // @UseFilters(HttpExceptionFilter)
  // 인스턴스 대신 클래스로 필터등록하는 것을 권장. Nestjs에서 자동으로 인스턴스를 관리해 메모리 사용량을 최적화한다.
  // @HttpCode(204) 상태코드 변경 가능
  // @Header('Cache-Control', 'no-store') 응답 헤더
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto)
  }

  @Get()
  async findAll(@Req() request: Request){
    try {
      await this.catsService.findAll();
    } catch (error) {
      // throw new HttpException({
      //   status: HttpStatus.FORBIDDEN,
      //   error: 'This is a custom message',
      // }, HttpStatus.FORBIDDEN, {
      //   cause: error
      // });
      throw new ForbiddenException()
    }
  }

 /*
 RxJs Observable 방식 - 스트림 기반 비동기 처리 (실시간 데이터, Websocket, 이벤트 처리에 최적)

 @Get()
  findAll(): Observable<any[]> {
    return of([]);
  }
*/

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id) {
    return this.catsService.findOne(id)
  }
}
