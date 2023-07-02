import {UpdatePlanRequestDto} from "../../dto/request/update-plan-request.dto";

export class UpdatePlanCommand {
    public readonly id: string;
    public readonly name: string;
    public readonly isActive: boolean;

    private constructor(id: string, name: string, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
    }

    public static of(updatePlanRequestDto: UpdatePlanRequestDto): UpdatePlanCommand {
        const {id, name, isActive} = updatePlanRequestDto;
        return new UpdatePlanCommand(id, name, isActive);
    }
}
