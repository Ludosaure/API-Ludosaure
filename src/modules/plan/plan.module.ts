import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Plan} from "../../domain/model/plan.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Plan]),
    ],
})
export class PlanModule {}
