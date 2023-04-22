import {IsDateString, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateReservationRequestDto {
    @ApiProperty({default: "2023-01-01"})
    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @ApiProperty({default: "2023-01-15"})
    @IsNotEmpty()
    @IsDateString()
    endDate: Date;

    @ApiProperty({default: "582dd22c-f28d-47cf-b8da-d3fc8c9d4284"})
    @IsNotEmpty()
    userId: string;

    @ApiProperty({default: ["2cfc2f43-5f32-405e-9cb2-26ac6e7ba615", "f302b3cf-077d-49c3-9b20-f8aa01c89bb9"]})
    @IsNotEmpty()
    games: string[];
}
