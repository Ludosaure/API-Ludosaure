import {UpdatePlanRequestDto} from "../../dto/request/update-plan-request.dto";

export class UpdatePlanCommand {
    public readonly id: string;
    public readonly name: string;
    public readonly reduction: number;
    public readonly nbWeeks: number;

    private constructor(id: string, name: string, reduction: number, nbWeeks: number) {
        this.id = id;
        this.name = name;
        this.reduction = reduction;
        this.nbWeeks = nbWeeks;
    }

    public static of(updatePlanRequestDto: UpdatePlanRequestDto): UpdatePlanCommand {
        const {id, name, reduction, nbWeeks} = updatePlanRequestDto;
        return new UpdatePlanCommand(id, name, reduction, nbWeeks);
    }
}
