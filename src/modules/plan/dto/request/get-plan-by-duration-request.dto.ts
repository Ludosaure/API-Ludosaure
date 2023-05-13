import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNotEmpty} from "class-validator";

export class GetPlanByDurationRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: '2023-04-01'})
    @IsDateString()
    public readonly start: Date;

    @IsNotEmpty()
    @ApiProperty({default: '2023-04-15'})
    @IsDateString()
    public readonly end: Date;
}
