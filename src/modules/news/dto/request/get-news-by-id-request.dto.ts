import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetNewsByIdRequestDto {
  @IsNotEmpty()
  @ApiProperty({ default: "b3d7f1e0-0b1a-4e1a-9f1a-0b1a4e1a9f1a" })
  public readonly id: string;
}
