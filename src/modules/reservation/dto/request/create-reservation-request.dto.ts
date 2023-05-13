import {IsDateString, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateReservationRequestDto {
    @ApiProperty({default: "2023-06-01"})
    @IsNotEmpty()
    @IsDateString()
    public readonly startDate: Date;

    @ApiProperty({default: "2023-06-15"})
    @IsNotEmpty()
    @IsDateString()
    public readonly endDate: Date;

    @ApiProperty({default: ["2cfc2f43-5f32-405e-9cb2-26ac6e7ba615", "f302b3cf-077d-49c3-9b20-f8aa01c89bb9"]})
    @IsNotEmpty()
    public readonly games: string[];
}
