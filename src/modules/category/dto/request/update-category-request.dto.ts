import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCategoryRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: "f3b5bd4d-7db3-49b9-b344-74bee932af1b"})
    id: string;

    @IsNotEmpty()
    @ApiProperty({default: "Category"})
    name: string;
}
