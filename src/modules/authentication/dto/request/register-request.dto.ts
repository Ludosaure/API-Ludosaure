import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  @ApiProperty({ default: 'alois.zimmermann45@gmail.com' })
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({ default: 'Azerty1234!' })
  @IsNotEmpty()
  public readonly password: string;

  @ApiProperty({ default: 'Azerty1234!' })
  @IsNotEmpty()
  public readonly confirmPassword: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'Doo' })
  public readonly lastname: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'John' })
  public readonly firstname: string;

  @IsPhoneNumber()
  @ApiProperty({ default: '+33666666666' })
  @IsNotEmpty()
  public readonly phone: string;
}
