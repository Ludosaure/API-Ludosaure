import {IsDateString, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateReservationRequestDto {
    @ApiProperty({default: "93541800-ddfe-493e-ab6f-98e1e0ac8fc9"})
    @IsNotEmpty()
    id: string;

    @ApiProperty({default: "2021-01-15"})
    @IsDateString()
    endDate: Date;

    @ApiProperty({default: true})
    isReturned: boolean;

    @ApiProperty({default: true})
    isCancelled: boolean;
}
