import {GetPlanByIdRequestDto} from "../../dto/request/get-plan-by-id-request.dto";

export class GetPlanByIdQuery {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static of(getPlanByIdRequestDto: GetPlanByIdRequestDto): GetPlanByIdQuery {
        const {id} = getPlanByIdRequestDto;
        return new GetPlanByIdQuery(id);
    }
}
