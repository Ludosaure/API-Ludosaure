import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteMediaRequestDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'b608bed8-0c0b-47ec-9c9c-587ccfbd51f2' })
  public readonly mediaId: string;
}
