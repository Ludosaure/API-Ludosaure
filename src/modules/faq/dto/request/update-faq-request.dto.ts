import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateFaqRequestDto {
    @ApiProperty({default: '93541800-ddfe-493e-ab6f-98e1e0ac8fc9'})
    @IsNotEmpty()
    id: string;

    @ApiProperty({default: 'Question'})
    question: string;

    @ApiProperty({default: 'Answer'})
    answer: string;
}
