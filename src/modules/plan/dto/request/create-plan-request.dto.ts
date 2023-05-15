import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePlanRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: 'semaine'})
    public readonly name: string;

    @IsNotEmpty()
    @ApiProperty({default: 2})
    public readonly reduction: number;

    @IsNotEmpty()
    @ApiProperty({default: 2})
    public readonly nbWeeks: number;
}
