import {IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateFaqRequestDto {
    @ApiProperty({default: '93541800-ddfe-493e-ab6f-98e1e0ac8fc9'})
    @IsNotEmpty()
    public readonly id: string;

    @ApiProperty({default: 'Question'})
    @IsOptional()
    public readonly question: string;

    @ApiProperty({default: 'Answer'})
    @IsOptional()
    public readonly answer: string;
}
