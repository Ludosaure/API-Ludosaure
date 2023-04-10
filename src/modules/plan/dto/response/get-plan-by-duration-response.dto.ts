import {Plan} from "../../../../domain/model/plan.entity";

export class GetPlanByDurationResponseDto {
    public readonly plan: Plan;

    constructor(plan: Plan) {
        this.plan = plan;
    }
}
