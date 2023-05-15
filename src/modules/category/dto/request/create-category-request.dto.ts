import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: "Category name"})
    public readonly name: string;
}
