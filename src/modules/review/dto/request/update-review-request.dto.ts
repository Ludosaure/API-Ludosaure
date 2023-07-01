import { IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateReviewRequestDto {
  @IsNotEmpty()
  @ApiProperty({ default: "93541800-ddfe-493e-ab6f-98e1e0ac8fc9" })
  gameId: string;

  @ApiProperty({ default: 5 })
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({ default: "This is a comment" })
  comment: string;
}
