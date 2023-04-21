import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateReservationRequestDto {
    @ApiProperty({default: "2021-01-01T00:00:00.000Z"})
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({default: "2021-01-15T00:00:00.000Z"})
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({default: 15})
    @IsNotEmpty()
    totalAmount: number;

    @ApiProperty({default: "93541800-ddfe-493e-ab6f-98e1e0ac8fc9"})
    @IsNotEmpty()
    userId: string;

    @ApiProperty({default: ["93541800-ddfe-493e-ab6f-98e1e0ac8fc9"]})
    @IsNotEmpty()
    games: string[];
}
