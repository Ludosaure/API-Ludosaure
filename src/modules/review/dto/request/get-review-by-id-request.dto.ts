import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetReviewByIdRequestDto {
  @IsNotEmpty()
  @ApiProperty({ default: "5813f374-cfca-4e1f-a609-a3930d2c9795" })
  id: string;
}
