import {Plan} from "../../../../domain/model/plan.entity";

export class GetAllPlansResponseDto {
    public readonly plans: Plan[];

    constructor(plans: Plan[]) {
        this.plans = plans;
    }
}
