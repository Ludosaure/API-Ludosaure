import { Min } from "class-validator";
import {Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Reservation} from "./reservation.entity";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, unique: true, name: 'facture_number'})
    @Generated('increment')
    invoiceNumber: number;

    @Column({nullable: false, name: 'created_at'})
    createdAt: Date;

    @Column('decimal', {nullable: false, precision: 10, scale: 2})
    amount: number;

    @Column({nullable: false, name: 'nb_weeks'})
    @Min(0)
    nbWeeks: number;

    @ManyToOne(() => Reservation, (reservation) => reservation.id, {nullable: false})
    @JoinColumn({name: 'reservation_id'})
    reservation: Reservation;
}
