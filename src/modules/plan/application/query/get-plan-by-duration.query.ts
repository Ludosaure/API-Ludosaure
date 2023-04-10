import {GetPlanByDurationRequestDto} from "../../dto/request/get-plan-by-duration-request.dto";

export class GetPlanByDurationQuery {
    public readonly start: Date;
    public readonly end: Date;

    private constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    public static of(getPlanByDurationRequestDto: GetPlanByDurationRequestDto): GetPlanByDurationQuery {
        const {start, end} = getPlanByDurationRequestDto;
        return new GetPlanByDurationQuery(start, end);
    }
}
