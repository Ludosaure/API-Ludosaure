import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Review} from "../../domain/model/review.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Review]),
    ],
})
export class ReviewModule {}
