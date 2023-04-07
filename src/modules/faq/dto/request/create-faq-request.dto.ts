import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateFaqRequestDto {
    @ApiProperty({default: 'Question'})
    @IsNotEmpty()
    question: string;

    @ApiProperty({default: 'Answer'})
    @IsNotEmpty()
    answer: string;
}
