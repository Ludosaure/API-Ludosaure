import { IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewRequestDto {
  @IsNotEmpty()
  @ApiProperty({ default: 5 })
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({ default: "This is a comment" })
  comment: string;

  @IsNotEmpty()
  @ApiProperty({ default: "5813f374-cfca-4e1f-a609-a3930d2c9795" })
  gameId: string;
}
