import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "../../domain/model/news.entity";
import { NewsController } from "./news.controller";
import { NewsEntityRepository } from "./news-entity.repository";
import { GetAllNewsHandler } from "./application/query/get-all-news.handler";
import { GetNewsByIdHandler } from "./application/query/get-news-by-id.handler";
import { GetTodayNewsHandler } from "./application/query/get-today-news.handler";
import { CreateNewsHandler } from "./application/command/create-news.handler";
import { UpdateNewsHandler } from "./application/command/update-news.handler";
import { DeleteNewsHandler } from "./application/command/delete-news.handler";
import { MediaEntityRepository } from "../media/media-entity.repository";
import { Media } from "../../domain/model/media.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([News, Media]),
    ],
    controllers: [NewsController],
    providers: [
      NewsEntityRepository,
      MediaEntityRepository,
      GetAllNewsHandler,
      GetNewsByIdHandler,
      GetTodayNewsHandler,
      CreateNewsHandler,
      UpdateNewsHandler,
      DeleteNewsHandler,
    ],
})
export class NewsModule {}
