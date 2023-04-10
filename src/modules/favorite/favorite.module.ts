import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FavoriteGame} from "../../domain/model/favorite-game.entity";
import {Game} from "../../domain/model/game.entity";
import {User} from "../../domain/model/user.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([FavoriteGame, Game, User]),
    ],
})
export class FavoriteModule {
}
