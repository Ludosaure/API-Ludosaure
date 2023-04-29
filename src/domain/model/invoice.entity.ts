import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Reservation} from "./reservation.entity";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, name: 'created_at'})
    createdAt: Date;

    @Column('decimal', {nullable: false, precision: 10, scale: 2})
    amount: number;

    @ManyToOne(() => Reservation, (reservation) => reservation.id, {nullable: false})
    @JoinColumn({name: 'reservation_id'})
    reservation: Reservation;
}
