import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Unavailability } from "./unavailability.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
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

    @ManyToOne(() => Category, (category) => category.id, {nullable: false})
    @JoinColumn({name: 'category_id'})
    category: Category;

    @OneToMany(() => Unavailability, (unavailability) => unavailability.game)
    unavailabilities: Unavailability[];
}
