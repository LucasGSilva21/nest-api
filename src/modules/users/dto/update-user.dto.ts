import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(60)
  name: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(60)
  email: string;
}
