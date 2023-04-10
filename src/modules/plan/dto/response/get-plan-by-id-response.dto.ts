import {Plan} from "../../../../domain/model/plan.entity";

export class getPlanByIdResponseDto {
    public readonly plan: Plan;

    constructor(plan: Plan) {
        this.plan = plan;
    }
}
