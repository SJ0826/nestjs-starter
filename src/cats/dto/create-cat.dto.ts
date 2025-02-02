import { IsInt, IsString } from 'class-validator';

/*
   데코레이터 기반의 유효성 검사
   - 타입과 유효성 검사 분리
   - ValidationPipe와 통합
 */
export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

/*
   zod 스키마 기반
   - 타입과 검증 통합 (z.infer)
   - 커스텀 파이프 필요
 */
// import { z } from 'zod';
//
// export const createCatSchema = z.object({
//   name: z.string(),
//   age: z.number(),
//   breed: z.string(),
// })
// .required();
//
// export type CreateCatDto = z.infer<typeof createCatSchema>