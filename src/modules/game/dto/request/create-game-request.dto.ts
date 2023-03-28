import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateGameRequestDTO {
    @IsNotEmpty()
    @ApiProperty({default: "Game name"})
    name: string;

    @ApiProperty({default: "Game description"})
    description: string;

    @IsNotEmpty()
    @ApiProperty({default: 2})
    nbPlayersMin: number;

    @IsNotEmpty()
    @ApiProperty({default: 4})
    nbPlayersMax: number;

    @IsNotEmpty()
    @ApiProperty({default: 30})
    averageDuration: number;

    @IsNotEmpty()
    @ApiProperty({default: 8})
    ageMin: number;

    @IsNotEmpty()
    @ApiProperty({default: 99})
    ageMax: number;

    @IsNotEmpty()
    @ApiProperty({default: 10})
    weeklyAmount: number;

    @IsNotEmpty()
    @ApiProperty({default: "5b2b9c6e-9d6a-464d-b7db-23e70de019c3"})
    categoryId: string;
}
