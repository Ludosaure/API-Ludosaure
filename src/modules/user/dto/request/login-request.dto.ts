import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ default: 'example@example.com' })
  public readonly email: string;
  @ApiProperty({ default: 'Azerty1234!' })
  public readonly password: string;
}
