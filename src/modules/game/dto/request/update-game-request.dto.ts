import {IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateGameRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: "f3b5bd4d-7db3-49b9-b344-74bee932af1b"})
    public readonly id: string;

    @IsOptional()
    @ApiProperty({default: "Game name"})
    public readonly name: string;

    @IsOptional()
    @ApiProperty({default: "Game description"})
    public readonly description: string;

    @IsOptional()
    @ApiProperty({default: 2})
    public readonly nbPlayersMin: number;

    @IsOptional()
    @ApiProperty({default: 4})
    public readonly nbPlayersMax: number;

    @IsOptional()
    @ApiProperty({default: 30})
    public readonly averageDuration: number;

    @IsOptional()
    @ApiProperty({default: 8})
    public readonly ageMin: number;

    @IsOptional()
    @ApiProperty({default: 10})
    public readonly weeklyAmount: number;

    @IsOptional()
    @ApiProperty({default: true})
    public readonly isArchived: boolean;

    @IsOptional()
    @ApiProperty({default: "5b2b9c6e-9d6a-464d-b7db-23e70de019c3"})
    public readonly categoryId: string;

    @IsOptional()
    @ApiProperty({default: '2ace9cf2-fbdd-4b99-92b6-9b2e21bd6cd3'})
    public readonly pictureId: string;
}
