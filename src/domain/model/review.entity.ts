import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsInt, Max, Min } from "class-validator";
import { Game } from "./game.entity";
import { User } from "./user.entity";

@Entity()
@Index(['game', 'user'], {unique: true})
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

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;
}
