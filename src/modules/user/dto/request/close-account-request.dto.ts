import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CloseAccountRequestDTO {
  @ApiProperty({ default: '011aada6-df74-43e9-a63c-dd09c5cdf4dd' })
  public readonly userId: string;
}
