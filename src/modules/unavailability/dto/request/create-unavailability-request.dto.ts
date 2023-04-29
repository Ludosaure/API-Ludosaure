import {IsDateString, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUnavailabilityRequestDto {
  @IsNotEmpty()
  @ApiProperty({default: "93541800-ddfe-493e-ab6f-98e1e0ac8fc9"})
  public readonly gameId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({default: "2023-06-01"})
  public readonly date: Date;
}
