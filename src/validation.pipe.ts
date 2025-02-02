import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {  // 기본타입은 검증하지않고 바로 반환, DTO인 경우에만 검증
      return value;
    }
    const object = plainToInstance(metatype, value); // 일반 객체를 DTO 클래스의 인스턴스로 변환
    const errors = await validate(object); // 클래스의 유효성 검사 기반으로 데이터 검증. 결과는 errors 배열로 반환
    if(errors.length > 0) {
      throw new BadRequestException('Validation failed'); // 유효성 검사에 실패하면 400에러 반환
    }
    return value;
  }

  private toValidate(metadata: Function): boolean { // 검증할 필요가 없는 기본타입 확인
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metadata);
  }
}

// export class ZodValidationPipe implements PipeTransform {
//   constructor(private schema: ZodSchema) {}
//
//   transform(value: any, metadata: ArgumentMetadata) {
//     try {
//       const parsedValue = this.schema.parse(value);
//       return parsedValue;
//     } catch (error) {
//       throw new BadRequestException('Validation failed')
//     }
//   }
// }

/*
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}
 */