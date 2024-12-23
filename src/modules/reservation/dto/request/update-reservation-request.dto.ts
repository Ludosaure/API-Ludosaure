import {IsDateString, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateReservationRequestDto {
    @ApiProperty({default: "93541800-ddfe-493e-ab6f-98e1e0ac8fc9"})
    @IsNotEmpty()
    public readonly reservationId: string;

    @ApiProperty({default: "2023-06-15"})
    @IsNotEmpty()
    @IsDateString()
    public readonly endDate: Date;
}
