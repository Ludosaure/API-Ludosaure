import { IsEmail, IsPhoneNumber, Min } from "class-validator";
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

    @Column({nullable: false, name: 'invoice_nb_weeks', default: 0})
    @Min(0)
    invoiceNbWeeks: number;

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

    @Column({nullable: false, name: 'reservation_number'})
    reservationNumber: number;

    @Column({nullable: false, name: 'reservation_start_date'})
    reservationStartDate: Date;

    @Column({nullable: false, name: 'reservation_end_date'})
    reservationEndDate: Date;

    @Column({nullable: false, unique: true, type: 'int'})
    reduction: number;

    @Column({nullable: false, name: 'reservation_nb_weeks', default: 0})
    @Min(0)
    reservationNbWeeks: number;

    @Column('decimal', {nullable: false, name: 'reservation_total_amount', precision: 10, scale: 2})
    reservationTotalAmount: number;

    @ManyToOne(() => Reservation, (reservation) => reservation.id, {nullable: false})
    @JoinColumn({name: 'reservation_id'})
    reservation: Reservation;
}
