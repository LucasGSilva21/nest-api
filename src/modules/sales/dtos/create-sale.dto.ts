import { IsNotEmpty, IsUUID, IsInt, IsPositive } from 'class-validator';

export class CreateSaleDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
