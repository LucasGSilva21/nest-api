import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(60)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 60)
  password: string;
}
