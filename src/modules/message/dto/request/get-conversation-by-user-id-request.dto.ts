import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetConversationByUserIdRequestDto {
  @ApiProperty({default: "2cfc2f43-5f32-405e-9cb2-26ac6e7ba615"})
  @IsNotEmpty()
  public readonly userId: string;
}
