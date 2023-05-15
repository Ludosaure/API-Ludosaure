import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCgvRequestDto {
  @ApiProperty({default: '<body><h1>Voici mes CGV</h1></body>'})
  @IsNotEmpty()
  public readonly cgv: string;
}
