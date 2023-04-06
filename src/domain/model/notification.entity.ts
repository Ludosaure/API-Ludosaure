import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {NotificationType} from "./enum/notification-type";
import {User} from "./user.entity";
import {Reservation} from "./reservation.entity";
import {Game} from "./game.entity";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, name: 'send_date'})
    sendDate: Date;

    @Column({nullable: false, name: 'was_opened'})
    wasOpened: boolean;

    @Column({nullable: false, type: 'enum', enum: NotificationType})
    type: NotificationType;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'receiver_id'})
    receiver: User;

    @ManyToOne(() => Reservation, (reservation) => reservation.id, {nullable: true})
    @JoinColumn({name: 'reservation_id'})
    reservation: Reservation;

    @ManyToOne(() => Game, (game) => game.id, {nullable: true})
    @JoinColumn({name: 'game_id'})
    game: Game;
}
