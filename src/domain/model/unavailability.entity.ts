import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "./game.entity";

@Entity()
export class Unavailability {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    date: Date;
    // TODO voir avec les gars si un seul jour ça leur va

    @ManyToOne(() => Game, (game) => game.id, {nullable: false})
    @JoinColumn({name: 'game_id'})
    game: Game;
}
