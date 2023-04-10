import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    content: string;

    @Column({nullable: false, name: 'send_date'})
    sendDate: Date;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'sender_id'})
    sender: User;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'receiver_id'})
    receiver: User;
}
