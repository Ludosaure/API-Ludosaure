import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsPhoneNumber} from 'class-validator';

export class UpdateUserRequestDTO {
    @ApiProperty({default: '2ace9cf2-fbdd-4b99-92b6-9b2e21bd6cd3'})
    public readonly userId: string;

    @ApiProperty({ default: 'Azerty1234!' })
    public readonly password: string;

    @ApiProperty({ default: 'Azerty1234!' })
    public readonly confirmPassword: string;

    @IsPhoneNumber()
    @ApiProperty({default: '0666666666'})
    public readonly phoneNumber: string;

    @ApiProperty({default: 'mr-john-doe'})
    public readonly pseudo: string;

    @ApiProperty({default: 'https://kengo.bzh/media/image/aaf9a0e8-b90f-4727-8d5d-1b94ab6f7a6c_sticker-kengojpg.jpg'})
    public readonly profilePicture: string;

    @ApiProperty({default: true})
    public readonly hasDisabledMailNotifications: boolean;

    @ApiProperty({default: true})
    public readonly hasDisabledPhoneNotifications: boolean;


}
