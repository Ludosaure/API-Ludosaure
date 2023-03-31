import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetGamesByNameRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: "gam"})
    name: string;
}
