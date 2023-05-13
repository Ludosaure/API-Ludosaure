import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResendConfirmationMailRequestDto {
  @IsEmail()
  @ApiProperty({ default: 'alois.zimmermann45@gmail.com' })
  @IsNotEmpty()
  public readonly email: string;
}
