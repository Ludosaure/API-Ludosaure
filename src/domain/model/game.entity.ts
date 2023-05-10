import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Unavailability } from "./unavailability.entity";
import { Reservation } from "./reservation.entity";
import { Review } from "./review.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, unique: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: false, name: 'nb_players_min'})
    nbPlayersMin: number;

    @Column({nullable: false, name: 'nb_players_max'})
    nbPlayersMax: number;

    @Column({nullable: false, name: 'average_duration'})
    averageDuration: number;

    @Column({nullable: false, name: 'age_min'})
    ageMin: number;

    @Column({nullable: false, name: 'weekly_amount'})
    weeklyAmount: number;

    @Column({nullable: false, default:false, name: 'is_archived'})
    isArchived: boolean;

    @ManyToOne(() => Category, (category) => category.id, {nullable: false})
    @JoinColumn({name: 'category_id'})
    category: Category;

    @OneToMany(() => Unavailability, (unavailability) => unavailability.game)
    unavailabilities: Unavailability[];

    @ManyToMany(() => Reservation, (reservation) => reservation.games)
    reservations: Reservation[];

    @OneToMany(() => Review, (review) => review.game)
    reviews: Review[];
}
