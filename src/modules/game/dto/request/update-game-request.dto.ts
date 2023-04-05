import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateGameRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: "f3b5bd4d-7db3-49b9-b344-74bee932af1b"})
    id: string;

    @ApiProperty({default: "Game name"})
    name: string;

    @ApiProperty({default: "Game description"})
    description: string;

    @ApiProperty({default: 2})
    nbPlayersMin: number;

    @ApiProperty({default: 4})
    nbPlayersMax: number;

    @ApiProperty({default: 30})
    averageDuration: number;

    @ApiProperty({default: 8})
    ageMin: number;

    @ApiProperty({default: 10})
    weeklyAmount: number;

    @ApiProperty({default: "5b2b9c6e-9d6a-464d-b7db-23e70de019c3"})
    categoryId: string;
}
