import {ApiProperty} from '@nestjs/swagger';

export class LoginRequestDTO {
  @ApiProperty({ default: 'alois.zimmermann45@gmail.com' })
  public readonly email: string;
  @ApiProperty({ default: 'Azerty1234!' })
  public readonly password: string;
}
