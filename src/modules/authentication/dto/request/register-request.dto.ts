import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterRequestDTO {
  @IsEmail()
  @ApiProperty({ default: 'example@example.com' })
  public readonly email: string;

  @ApiProperty({ default: 'Azerty1234!' })
  public readonly password: string;

  @ApiProperty({ default: 'Azerty1234!' })
  public readonly confirmPassword: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'Doo' })
  public readonly lastname: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'John' })
  public readonly firstname: string;

  @IsPhoneNumber()
  @ApiProperty({ default: '0666666666' })
  public readonly phone: string;
}
