import {CommandHandler} from "@nestjs/cqrs";
import {UpdatePlanCommand} from "./update-plan.command";
import {PlanNotFoundException} from "../../exceptions/plan-not-found.exception";
import {PlanEntityRepository} from "../../plan-entity.repository";

@CommandHandler(UpdatePlanCommand)
export class UpdatePlanHandler {
    constructor(private readonly planRepository: PlanEntityRepository) {
    }

    async execute(command: UpdatePlanCommand) {
        const foundPlan = await this.planRepository.findById(command.id);
        if (foundPlan == null) {
            throw new PlanNotFoundException();
        }

        if (command.name != null)
            foundPlan.name = command.name;
        if (command.reduction != null)
            foundPlan.reduction = command.reduction;
        if (command.nbWeeks != null)
            foundPlan.nbWeeks = command.nbWeeks;
        await this.planRepository.saveOrUpdate(foundPlan);
    }
}
