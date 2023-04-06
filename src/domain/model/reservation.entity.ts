import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Package} from "./package.entity";
import {Game} from "./game.entity";

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

    @Column({nullable: false, name: 'total_amount'})
    totalAmount: number;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Package, (appliedPackage) => appliedPackage.id, {nullable: true})
    @JoinColumn({name: 'applied_package_id'})
    appliedPackage: Package;

    @ManyToMany(() => Game, (game) => game.id)
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
}
