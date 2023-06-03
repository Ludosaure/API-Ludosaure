import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetPlanByIdQuery} from "./get-plan-by-id.query";
import {PlanNotFoundException} from "../../exceptions/plan-not-found.exception";
import {getPlanByIdResponseDto} from "../../dto/response/get-plan-by-id-response.dto";
import {PlanEntityRepository} from "../../plan-entity.repository";

@QueryHandler(GetPlanByIdQuery)
export class GetPlanByIdHandler implements IQueryHandler<GetPlanByIdQuery> {
    constructor(private readonly planRepository: PlanEntityRepository) {
    }

    async execute(query: GetPlanByIdQuery) {
        const plan = await this.planRepository.findById(query.id);
        if(plan == null) {
            throw new PlanNotFoundException();
        }
        return new getPlanByIdResponseDto(plan);
    }
}
