import {QueryHandler} from "@nestjs/cqrs";
import {GetPlanByDurationQuery} from "./get-plan-by-duration.query";
import {GetPlanByDurationResponseDto} from "../../dto/response/get-plan-by-duration-response.dto";
import {PlanEntityRepository} from "../../plan-entity.repository";

@QueryHandler(GetPlanByDurationQuery)
export class GetPlanByDurationHandler {
    constructor(private readonly planRepository: PlanEntityRepository) {
    }

    async execute(query: GetPlanByDurationQuery) {
        const plan = await this.planRepository.findByDuration(query.start, query.end);
        return new GetPlanByDurationResponseDto(plan);
    }
}
