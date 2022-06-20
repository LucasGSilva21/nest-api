import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsOptional } from 'class-validator';

export class PaginationOptionsDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  page: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  perPage: string;
}
