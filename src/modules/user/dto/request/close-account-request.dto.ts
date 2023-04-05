import {ApiProperty} from '@nestjs/swagger';

export class CloseAccountRequestDto {
  @ApiProperty({ default: '011aada6-df74-43e9-a63c-dd09c5cdf4dd' })
  public readonly userId: string;
}
