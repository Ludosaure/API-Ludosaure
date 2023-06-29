import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator';

export class UpdateUserRequestDto {
    @ApiProperty({default: '2ace9cf2-fbdd-4b99-92b6-9b2e21bd6cd3'})
    @IsNotEmpty()
    public readonly userId: string;

    @IsOptional()
    @ApiProperty({ default: 'Azerty1234!' })
    public readonly password: string;

    @IsOptional()
    @ApiProperty({ default: 'Azerty1234!' })
    public readonly confirmPassword: string;

    @IsPhoneNumber()
    @IsOptional()
    @ApiProperty({default: '+33666666666'})
    public readonly phoneNumber: string;

    @IsOptional()
    @ApiProperty({default: 'mr-john-doe'})
    public readonly pseudo: string;

    @IsOptional()
    @ApiProperty({default: true})
    public readonly hasEnabledMailNotifications: boolean;

    @IsOptional()
    @ApiProperty({default: '2ace9cf2-fbdd-4b99-92b6-9b2e21bd6cd3'})
    public readonly profilePictureId: string;
}
