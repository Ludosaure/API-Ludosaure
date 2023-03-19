import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import {Role} from "./enum/role";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsPhoneNumber()
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, unique: true })
  pseudo: string;

  @Column({ nullable: false, default: false })
  is_account_verified: boolean;

  @Column({ nullable: false, default: false })
  must_change_password: boolean;

  @Column({ nullable: true })
  profile_picture_path: string;

  @Column({ nullable: false, default: false })
  has_disabled_mail_notifications: boolean;

  @Column({ nullable: false, default: false })
  has_disabled_phone_notifications: boolean;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  @Column({ nullable: false, default: false })
  is_account_closed: boolean;

  isAccountActive(): boolean {
    return this.is_account_verified && !this.is_account_closed;
  }
}
