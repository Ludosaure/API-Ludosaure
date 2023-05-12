import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { Role } from "./enum/role";
import { FavoriteGame } from "./favorite-game.entity";
import { Exclude } from "class-transformer";
import { Media } from "./media.entity";

@Entity()
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
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({nullable: true, unique: true})
    pseudo: string;

    @Column({nullable: false, type: 'enum', enum: Role, default: Role.CLIENT})
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

    @OneToOne(() => Media, media => media.id, {nullable: true})
    @JoinColumn({name: 'profile_picture_id'})
    profilePicture: Media;

    @OneToMany(() => FavoriteGame, (favoriteGame) => favoriteGame.user)
    favoriteGames: FavoriteGame[];

    isAccountActive(): boolean {
        return this.isAccountVerified && !this.isAccountClosed;
    }
}
