import {ApiProperty} from "@nestjs/swagger";
import {IsDate} from "class-validator";

export class GetPlanByDurationRequestDto {
    @ApiProperty({default: '2023-04-01'})
    @IsDate()
    start: Date;

    @ApiProperty({default: '2023-04-15'})
    @IsDate()
    end: Date;
}
