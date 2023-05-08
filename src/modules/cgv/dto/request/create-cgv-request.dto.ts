import { ApiProperty } from "@nestjs/swagger";

export class CreateCgvRequestDto {
  @ApiProperty({default: '<body><h1>Voici mes CGV</h1></body>'})
  cgv: string;
}
