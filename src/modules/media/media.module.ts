import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Media} from "../../domain/model/media.entity";
import {Game} from "../../domain/model/game.entity";
import {News} from "../../domain/model/news.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Media, Game, News]),
    ],
})
export class MediaModule {}
