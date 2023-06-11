import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateChargeRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({default: "pm_card_visa"})
  paymentMethodId: string;

  @IsNumber()
  @ApiProperty({default: 2500})
  amount: number; // en centimes
}