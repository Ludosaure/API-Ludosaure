import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class DeleteCategoryRequestDto {
    @IsNotEmpty()
    @ApiProperty({default: "f3b5bd4d-7db3-49b9-b344-74bee932af1b"})
    id: string;
}
