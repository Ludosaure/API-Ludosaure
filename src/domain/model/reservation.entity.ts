import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./user.entity";
import {Game} from "./game.entity";
import {Plan} from "./plan.entity";
import {DateUtils} from "../../shared/date.utils";
import {ReservationTooShortException} from "../../modules/reservation/exceptions/reservation-too-short.exception";
import {
    ReservationNotInitializedProperlyException
} from "../../modules/reservation/exceptions/reservation-not-initialized-properly.exception";
import {
    ReservationAlreadyEndedException
} from "../../modules/reservation/exceptions/reservation-already-ended.exception";
import {InvalidDateException} from "../../modules/reservation/exceptions/invalid-date.exception";
import { Min } from "class-validator";
import { AppUtils } from "../../shared/appUtils";
import { Invoice } from "./invoice.entity";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, unique: true, name: 'reservation_number'})
    @Generated('increment')
    reservationNumber: number;

    @Column({nullable: false, name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({ type: 'date', nullable: false, name: 'start_date' })
    startDate: Date;

    @CreateDateColumn({ type: 'date', nullable: false, name: 'end_date' })
    endDate: Date;

    @Column({nullable: false, name: 'nb_weeks', default: 0})
    @Min(0)
    nbWeeks: number;

    @Column({nullable: false, default: false, name: 'is_returned'})
    isReturned: boolean;

    @Column({nullable: true, name: 'returned_date'})
    returnedDate: Date;

    @Column({nullable: false, default: false, name: 'is_cancelled'})
    isCancelled: boolean;

    @Column({nullable: true, name: 'cancelled_date'})
    cancelledDate: Date;

    @Column('decimal', {nullable: false, name: 'total_amount', precision: 10, scale: 2})
    totalAmount: number;

    @Column({nullable: false, default: false, name: 'is_paid'})
    isPaid: boolean;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Plan, (appliedPlan) => appliedPlan.id, {nullable: true})
    @JoinColumn({name: 'applied_plan_id'})
    appliedPlan: Plan;

    @ManyToMany(() => Game, (game) => game.reservations, {nullable: false})
    @JoinTable({
        name: 'reservation_game',
        joinColumn: {
            name: 'reservation_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'game_id',
            referencedColumnName: 'id'
        }
    })
    games: Game[];

    @OneToMany(() => Invoice, (invoice) => invoice.reservation, {nullable: true})
    invoices: Invoice[];

    public calculateTotalAmount(): number {
        if (this.startDate == null || this.endDate == null || this.games == null) {
            throw new ReservationNotInitializedProperlyException();
        }

        let totalAmount = 0;
        const weeks = DateUtils.getNbWeeksBetween(this.startDate, this.endDate);

        if (weeks < 1) {
            throw new ReservationTooShortException();
        }

        for (const game of this.games) {
            totalAmount += game.weeklyAmount * weeks;
        }

        if (this.appliedPlan != null) {
            let reduction = 1 - this.appliedPlan.reduction / 100;
            totalAmount = totalAmount * reduction;
        }

        return AppUtils.roundToTwoDecimals(totalAmount);
    }

    public areDatesValid(newEndDate: Date): boolean {
        if (this.endDate < new Date()) {
            throw new ReservationAlreadyEndedException();
        }

        DateUtils.checkIfStartDateIsBeforeEndDate(this.startDate, newEndDate);

        if (newEndDate < this.endDate) {
            throw new InvalidDateException('Reservation can only be extended');
        }

        return true;
    }
}
