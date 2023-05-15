import {IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateGameRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: "Game name"})
    public readonly name: string;

    @IsOptional()
    @ApiProperty({default: "Game description"})
    public readonly description: string;

    @IsNotEmpty()
    @ApiProperty({default: 2})
    public readonly nbPlayersMin: number;

    @IsNotEmpty()
    @ApiProperty({default: 4})
    public readonly nbPlayersMax: number;

    @IsNotEmpty()
    @ApiProperty({default: 30})
    public readonly averageDuration: number;

    @IsNotEmpty()
    @ApiProperty({default: 8})
    public readonly ageMin: number;

    @IsNotEmpty()
    @ApiProperty({default: 10})
    public readonly weeklyAmount: number;

    @IsNotEmpty()
    @ApiProperty({default: "5b2b9c6e-9d6a-464d-b7db-23e70de019c3"})
    public readonly categoryId: string;

    @ApiProperty({default: '2ace9cf2-fbdd-4b99-92b6-9b2e21bd6cd3'})
    public readonly pictureId: string;
}
