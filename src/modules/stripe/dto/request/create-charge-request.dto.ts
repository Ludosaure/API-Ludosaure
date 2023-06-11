import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateChargeRequestDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @IsNumber()
  amount: number;
}