import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {IsEmail, IsPhoneNumber} from 'class-validator';
import {Role} from "./enum/role";
import {Game} from "./game.entity";
import {FavoriteGame} from "./favorite-game.entity";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    firstname: string;

    @Column({nullable: false})
    lastname: string;

    @Column({nullable: false, unique: true})
    @IsEmail()
    email: string;

    @Column({nullable: false})
    @IsPhoneNumber()
    phone: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: true, unique: true})
    pseudo: string;

    @Column({nullable: true, name: 'profile_picture_path'})
    profilePicturePath: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: Role,
        default: Role.CLIENT,
    })
    role: Role;

    @Column({nullable: false, default: false, name: 'is_account_verified'})
    isAccountVerified: boolean;

    @Column({nullable: false, default: true, name: 'has_enabled_mail_notifications'})
    hasEnabledMailNotifications: boolean;

    @Column({nullable: false, default: true, name: 'has_enabled_phone_notifications'})
    hasEnabledPhoneNotifications: boolean;

    @Column({nullable: false, default: false, name: 'must_change_password'})
    mustChangePassword: boolean;

    @Column({nullable: false, default: false, name: 'is_account_closed'})
    isAccountClosed: boolean;

    @OneToMany(() => FavoriteGame, (favoriteGame) => favoriteGame.user)
    favoriteGames: FavoriteGame[];

    isAccountActive(): boolean {
        return this.isAccountVerified && !this.isAccountClosed;
    }
}
