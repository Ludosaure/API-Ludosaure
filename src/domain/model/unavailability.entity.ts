import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "./game.entity";

@Entity()
export class Unavailability {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'date', nullable: false })
    date: Date;

    @ManyToOne(
        () => Game,
        (game) => game.id,
        { nullable: false, onDelete: 'CASCADE', }
    )
    @JoinColumn({name: 'game_id'})
    game: Game;
}
