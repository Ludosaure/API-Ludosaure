import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FavoriteGame} from "../../domain/model/favorite-game.entity";
import {Game} from "../../domain/model/game.entity";
import {User} from "../../domain/model/user.entity";
import { FavoriteEntityRepository } from "./favorite-entity.repository";
import { GetFavoriteByGameHandler } from "./application/query/get-favorite-by-game.handler";
import { GetFavoriteByUserHandler } from "./application/query/get-favorite-by-user.handler";
import { CreateFavoriteHandler } from "./application/command/create-favorite.handler";
import { DeleteFavoriteHandler } from "./application/command/delete-favorite.handler";
import { FavoriteController } from "./favorite.controller";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([FavoriteGame, Game, User]),
    ],
    controllers: [FavoriteController],
    providers: [
      FavoriteEntityRepository,
      GetFavoriteByGameHandler,
      GetFavoriteByUserHandler,
      CreateFavoriteHandler,
      DeleteFavoriteHandler,
    ],
})
export class FavoriteModule {
}
