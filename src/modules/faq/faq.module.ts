import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Faq} from "../../domain/model/faq.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Faq]),
    ],
})
export class FaqModule {}
