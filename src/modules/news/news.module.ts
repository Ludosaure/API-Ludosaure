import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "../../domain/model/news.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([News]),
    ],
})
export class NewsModule {}
