import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CloseAccountRequestDto {
  @IsNotEmpty()
  @ApiProperty({ default: '011aada6-df74-43e9-a63c-dd09c5cdf4dd' })
  public readonly userId: string;
}
