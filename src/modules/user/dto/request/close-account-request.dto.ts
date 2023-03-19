import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CloseAccountRequestDTO {
  @ApiProperty({ default: '2ace9cf2-fbdd-4b99-92b6-9b2e21bd6cd3' })
  public readonly userId: string;
}
