import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./user.entity";
import {Game} from "./game.entity";

@Entity()
export class FavoriteGame {
    @PrimaryColumn({name: 'user_id'})
    userId: string;

    @PrimaryColumn({name: 'game_id'})
    gameId: string;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Game, (game) => game.id, {nullable: false})
    @JoinColumn({name: 'game_id'})
    game: Game;

    @Column({nullable: false, name: 'creation_date'})
    creationDate: Date;
}
