import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateFavoriteRequestDto {
  @ApiProperty({default: "b4d8b0a0-5e5a-4e1a-9b1a-8b0a0b4d5e5a"})
  @IsNotEmpty()
  gameId: string;
}
