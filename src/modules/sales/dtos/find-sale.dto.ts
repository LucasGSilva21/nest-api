import { IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
