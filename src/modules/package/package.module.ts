import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Package} from "../../domain/model/package.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Package]),
    ],
})
export class PackageModule {}
