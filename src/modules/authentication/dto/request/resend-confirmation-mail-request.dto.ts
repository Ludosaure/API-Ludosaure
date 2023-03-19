import {ApiProperty} from '@nestjs/swagger';
import {IsEmail} from 'class-validator';

export class ResendConfirmationMailRequestDTO {
  @IsEmail()
  @ApiProperty({ default: 'alois.zimmermann45@gmail.com' })
  public readonly email: string;
}
