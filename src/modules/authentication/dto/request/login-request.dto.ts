import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ default: 'alois.zimmermann45@gmail.com' })
  @IsNotEmpty()
  public readonly email: string;
  @ApiProperty({ default: 'Azerty1234!' })
  @IsNotEmpty()
  public readonly password: string;
}
