import {IsDate, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUnavailabilityRequestDto {
  @IsNotEmpty()
  @ApiProperty({default: "93541800-ddfe-493e-ab6f-98e1e0ac8fc9"})
  public readonly gameId: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({default: "2023-01-01"})
  public readonly date: Date;
}
