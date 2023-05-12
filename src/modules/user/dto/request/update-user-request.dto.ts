import {ApiProperty} from '@nestjs/swagger';
import {IsPhoneNumber} from 'class-validator';

export class UpdateUserRequestDto {
    @ApiProperty({default: '2ace9cf2-fbdd-4b99-92b6-9b2e21bd6cd3'})
    public readonly userId: string;

    @ApiProperty({ default: 'Azerty1234!' })
    public readonly password: string;

    @ApiProperty({ default: 'Azerty1234!' })
    public readonly confirmPassword: string;

    @IsPhoneNumber()
    @ApiProperty({default: '+33666666666'})
    public readonly phoneNumber: string;

    @ApiProperty({default: 'mr-john-doe'})
    public readonly pseudo: string;

    @ApiProperty({default: true})
    public readonly hasEnabledMailNotifications: boolean;

    @ApiProperty({default: true})
    public readonly hasEnabledPhoneNotifications: boolean;


}
