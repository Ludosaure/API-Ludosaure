import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category.entity";

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

    @Column({nullable: false, name: 'age_max'})
    ageMax: number;

    @Column({nullable: false, name: 'weekly_amount'})
    weeklyAmount: number;

    @ManyToOne(() => Category, (category) => category.id, {nullable: false})
    @JoinColumn({name: 'category_id'})
    categoryId: string;
}
