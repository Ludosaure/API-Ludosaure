import {ApiProperty} from "@nestjs/swagger";

export class UpdatePlanRequestDto {
    @ApiProperty({default: '93541800-ddfe-493e-ab6f-98e1e0ac8fc9'})
    id: string;

    @ApiProperty({default: 'semaine'})
    name: string;

    @ApiProperty({default: 2})
    reduction: number;

    @ApiProperty({default: 2})
    nbWeeks: number;
}
