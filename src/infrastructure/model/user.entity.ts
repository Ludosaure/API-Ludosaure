import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {IsEmail, IsPhoneNumber} from 'class-validator';

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    firstname: string;

    @Column({nullable: false})
    lastname: string;

    @Column({nullable: false})
    @IsEmail()
    email: string;

    @Column({nullable: false})
    @IsPhoneNumber()
    phone: string;

    @Column({nullable: false})
    password: string;
}
