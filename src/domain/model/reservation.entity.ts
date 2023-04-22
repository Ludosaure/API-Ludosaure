import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Game} from "./game.entity";
import {Plan} from "./plan.entity";
import {DateUtils} from "../../shared/date.utils";
import {ReservationTooShortException} from "../../modules/reservation/exceptions/reservation-too-short.exception";
import {
    ReservationNotInitializedProperlyException
} from "../../modules/reservation/exceptions/reservation-not-initialized-properly.exception";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, name: 'created_at'})
    createdAt: Date;

    @Column({nullable: false, name: 'start_date'})
    startDate: Date;

    @Column({nullable: false, name: 'end_date'})
    endDate: Date;

    @Column({nullable: false, default: false, name: 'is_returned'})
    isReturned: boolean;

    @Column({nullable: false, default: false, name: 'is_cancelled'})
    isCancelled: boolean;

    @Column({nullable: true, name: 'cancelled_date'})
    cancelledDate: Date;

    @Column('decimal', {nullable: false, name: 'total_amount', precision: 10, scale: 2})
    //TODO il y a 3 décimales qui s'affichent dans le front
    totalAmount: number;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Plan, (appliedPlan) => appliedPlan.id, {nullable: true})
    @JoinColumn({name: 'applied_plan_id'})
    appliedPlan: Plan;

    @ManyToMany(() => Game, (game) => game.id, {nullable: false})
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

    public calculateTotalAmount(): number {
        if (this.startDate == null || this.endDate == null || this.games == null) {
            console.log(this.startDate, this.endDate, this.games)
            // TODO game is undefined pour l'update, il faut récupérer la relation
            throw new ReservationNotInitializedProperlyException();
        }
        let totalAmount = 0;
        const weeks = DateUtils.getWeeksBetween(this.startDate, this.endDate);
        if (weeks < 1) {
            throw new ReservationTooShortException();
        }
        for (const game of this.games) {
            totalAmount += game.weeklyAmount * weeks;
            if (this.appliedPlan != null) {
                totalAmount = totalAmount * (1 - this.appliedPlan.reduction / 100);
            }
        }
        return totalAmount;
    }
}
