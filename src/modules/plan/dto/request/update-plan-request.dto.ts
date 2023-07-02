import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePlanRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: '93541800-ddfe-493e-ab6f-98e1e0ac8fc9'})
    public readonly id: string;

    @IsOptional()
    @ApiProperty({default: 'semaine'})
    public readonly name: string;

    @IsOptional()
    @ApiProperty({default: false})
    public readonly isActive: boolean;
}
