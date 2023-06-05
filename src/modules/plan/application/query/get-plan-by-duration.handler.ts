import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetPlanByDurationQuery} from "./get-plan-by-duration.query";
import {GetPlanByDurationResponseDto} from "../../dto/response/get-plan-by-duration-response.dto";
import {PlanEntityRepository} from "../../plan-entity.repository";
import {
    EndDateBiggerThanStartDateException
} from "../../../../shared/exceptions/end-date-bigger-than-start-date.exception";

@QueryHandler(GetPlanByDurationQuery)
export class GetPlanByDurationHandler implements IQueryHandler<GetPlanByDurationQuery> {
    constructor(private readonly planRepository: PlanEntityRepository) {
    }

    async execute(query: GetPlanByDurationQuery) {
        const {start, end} = query;
        if(start > end) {
            throw new EndDateBiggerThanStartDateException();
        }
        const plan = await this.planRepository.findByDuration(start, end);
        return new GetPlanByDurationResponseDto(plan);
    }
}
