import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateFaqRequestDto {
    @ApiProperty({default: 'Question'})
    @IsNotEmpty()
    public readonly question: string;

    @ApiProperty({default: 'Answer'})
    @IsNotEmpty()
    public readonly answer: string;
}
