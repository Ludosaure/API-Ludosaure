import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class GetUsersByIdRequest {
  @IsNotEmpty()
  @ApiProperty()
  public readonly id: string;
}
