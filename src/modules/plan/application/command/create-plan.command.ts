import {CreatePlanRequestDto} from "../../dto/request/create-plan-request.dto";

export class CreatePlanCommand {
    public readonly name: string;
    public readonly reduction: number;
    public readonly nbWeeks: number;

    private constructor(name: string, reduction: number, nbWeeks: number) {
        this.name = name;
        this.reduction = reduction;
        this.nbWeeks = nbWeeks;
    }

    public static of(createPlanRequestDto: CreatePlanRequestDto): CreatePlanCommand {
        const {name, reduction, nbWeeks} = createPlanRequestDto;
        return new CreatePlanCommand(name, reduction, nbWeeks);
    }
}
