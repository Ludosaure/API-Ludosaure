import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "./game.entity";
import {News} from "./news.entity";

@Entity()
export class Media {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    name: string;

    @ManyToOne(() => Game, game => game.id)
    game: Game;

    @ManyToOne(() => News, news => news.id)
    news: News;
}
