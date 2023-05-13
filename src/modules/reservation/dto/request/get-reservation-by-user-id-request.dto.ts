import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetReservationByUserIdRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: "582dd22c-f28d-47cf-b8da-d3fc8c9d4284"})
    userId: string;
}
