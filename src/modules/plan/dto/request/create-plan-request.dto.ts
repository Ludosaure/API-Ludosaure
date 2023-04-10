import {ApiProperty} from "@nestjs/swagger";

export class CreatePlanRequestDto {
    @ApiProperty({default: 'semaine'})
    name: string;

    @ApiProperty({default: 2})
    reduction: number;

    @ApiProperty({default: 2})
    nbWeeks: number;
}
