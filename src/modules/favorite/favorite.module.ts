import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FavoriteGame} from "../../domain/model/favorite-game.entity";
import {Game} from "../../domain/model/game.entity";
import {User} from "../../domain/model/user.entity";
import { FavoriteEntityRepository } from "./favorite-entity.repository";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([FavoriteGame, Game, User]),
    ],
    providers: [
      FavoriteEntityRepository,
    ],
})
export class FavoriteModule {
}
