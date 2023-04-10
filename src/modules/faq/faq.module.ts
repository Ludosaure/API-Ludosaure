import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Faq} from "../../domain/model/faq.entity";
import {FaqController} from "./faq.controller";
import {FaqEntityRepository} from "./faq-entity.repository";
import {GetAllFaqHandler} from "./application/query/get-all-faq.handler";
import {CreateFaqHandler} from "./application/command/create-faq.handler";
import {UpdateFaqHandler} from "./application/command/update-faq.handler";
import {DeleteFaqHandler} from "./application/command/delete-faq.handler";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Faq]),
    ],
    controllers: [FaqController],
    providers: [
        FaqEntityRepository,
        GetAllFaqHandler,
        CreateFaqHandler,
        UpdateFaqHandler,
        DeleteFaqHandler,
    ],
})
export class FaqModule {}
