import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreatePlanCommand} from "./create-plan.command";
import {Plan} from "../../../../domain/model/plan.entity";
import {PlanEntityRepository} from "../../plan-entity.repository";
import {NameAlreadyUsedException} from "../../exceptions/name-already-used.exception";
import {ReductionAlreadyExistsException} from "../../exceptions/reduction-already-exists.exception";
import {NbWeeksAlreadyExistsException} from "../../exceptions/nb-weeks-already-exists.exception";

@CommandHandler(CreatePlanCommand)
export class CreatePlanHandler implements ICommandHandler<CreatePlanCommand> {
    constructor(private readonly planRepository: PlanEntityRepository) {
    }

    async execute(command: CreatePlanCommand) {
        let foundPlan = await this.planRepository.findByName(command.name);
        if (foundPlan != null) {
            throw new NameAlreadyUsedException();
        }
        foundPlan = await this.planRepository.findByReduction(command.reduction)
        if (foundPlan != null) {
            throw new ReductionAlreadyExistsException();
        }
        foundPlan = await this.planRepository.findByNbWeeks(command.nbWeeks)
        if (foundPlan != null) {
            throw new NbWeeksAlreadyExistsException();
        }

        const plan = new Plan();
        plan.name = command.name;
        plan.reduction = command.reduction;
        plan.nbWeeks = command.nbWeeks;
        await this.planRepository.saveOrUpdate(plan);
    }
}
