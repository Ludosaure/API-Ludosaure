import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsInt, Max, Min } from "class-validator";
import { Game } from "./game.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    comment: string;

    @ManyToOne(() => Game, (game) => game.id, {nullable: false})
    @JoinColumn({name: 'game_id'})
    game: Game;
}
