import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Plan} from "../../domain/model/plan.entity";
import {PlanController} from "./plan.controller";
import {PlanEntityRepository} from "./plan-entity.repository";
import {CreatePlanHandler} from "./application/command/create-plan.handler";
import {DeletePlanHandler} from "./application/command/delete-plan.handler";
import {UpdatePlanHandler} from "./application/command/update-plan.handler";
import {GetAllPlansHandler} from "./application/query/get-all-plans.handler";
import {GetPlanByDurationHandler} from "./application/query/get-plan-by-duration.handler";
import {GetPlanByIdHandler} from "./application/query/get-plan-by-id.handler";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Plan]),
    ],
    controllers: [PlanController],
    providers: [
        PlanEntityRepository,
        CreatePlanHandler,
        DeletePlanHandler,
        UpdatePlanHandler,
        GetAllPlansHandler,
        GetPlanByDurationHandler,
        GetPlanByIdHandler,
    ],
})
export class PlanModule {}
