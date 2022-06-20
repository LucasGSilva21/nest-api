import { IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(60)
  email: string;

  @IsString()
  @MaxLength(60)
  password: string;
}
