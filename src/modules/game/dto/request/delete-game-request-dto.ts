import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteGameRequestDto {
  @ApiProperty({ default: '93541800-ddfe-493e-ab6f-98e1e0ac8fc9' })
  @IsNotEmpty()
  public readonly gameId: string;
}
