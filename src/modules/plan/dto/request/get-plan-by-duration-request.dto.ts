import {ApiProperty} from "@nestjs/swagger";
import {IsDateString} from "class-validator";

export class GetPlanByDurationRequestDto {
    @ApiProperty({default: '2023-04-01'})
    @IsDateString()
    start: Date;

    @ApiProperty({default: '2023-04-15'})
    @IsDateString()
    end: Date;
}
