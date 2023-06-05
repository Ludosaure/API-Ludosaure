import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllPlansQuery} from "./get-all-plans.query";
import {GetAllPlansResponseDto} from "../../dto/response/get-all-plans-response.dto";
import {PlanEntityRepository} from "../../plan-entity.repository";

@QueryHandler(GetAllPlansQuery)
export class GetAllPlansHandler implements IQueryHandler<GetAllPlansQuery> {
    constructor(private readonly planRepository: PlanEntityRepository) {
    }

    async execute() {
        const plans = await this.planRepository.findAll();
        return new GetAllPlansResponseDto(plans);
    }
}
