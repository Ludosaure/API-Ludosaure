import {CommandHandler} from "@nestjs/cqrs";
import {UpdatePlanCommand} from "./update-plan.command";
import {PlanNotFoundException} from "../../exceptions/plan-not-found.exception";
import {PlanEntityRepository} from "../../plan-entity.repository";
import {NameAlreadyUsedException} from "../../exceptions/name-already-used.exception";
import {ReductionAlreadyExistsException} from "../../exceptions/reduction-already-exists.exception";
import {NbWeeksAlreadyExistsException} from "../../exceptions/nb-weeks-already-exists.exception";

@CommandHandler(UpdatePlanCommand)
export class UpdatePlanHandler {
    constructor(private readonly planRepository: PlanEntityRepository) {
    }

    async execute(command: UpdatePlanCommand) {
        let plan = await this.planRepository.findById(command.id);
        if (plan == null) {
            throw new PlanNotFoundException();
        }

        let foundPlan;
        if (command.name != null) {
            foundPlan = await this.planRepository.findByName(command.name);
            if (foundPlan != null) {
                throw new NameAlreadyUsedException();
            }
            plan.name = command.name;
        }
        if (command.reduction != null) {
            foundPlan = await this.planRepository.findByReduction(command.reduction)
            if (foundPlan != null) {
                throw new ReductionAlreadyExistsException();
            }
            plan.reduction = command.reduction;
        }
        if (command.nbWeeks != null) {
            foundPlan = await this.planRepository.findByNbWeeks(command.nbWeeks)
            if (foundPlan != null) {
                throw new NbWeeksAlreadyExistsException();
            }
            plan.nbWeeks = command.nbWeeks;
        }
        await this.planRepository.saveOrUpdate(plan);
    }
}
