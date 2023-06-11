import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    content: string;

    @Column({nullable: false, name: 'send_date', default: () => 'CURRENT_TIMESTAMP'})
    sendDate: Date;

    @Column({nullable: false, default: false, name: 'is_read'})
    isRead: boolean;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'sender_id'})
    author: User;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'receiver_id'})
    receiver: User;
}
