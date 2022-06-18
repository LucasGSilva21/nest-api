import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsBoolean,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
