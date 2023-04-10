import {DeletePlanRequestDto} from "../../dto/request/delete-plan-request.dto";

export class DeletePlanCommand {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static of(deletePlanRequestDto: DeletePlanRequestDto): DeletePlanCommand {
        const {id} = deletePlanRequestDto;
        return new DeletePlanCommand(id);
    }
}
