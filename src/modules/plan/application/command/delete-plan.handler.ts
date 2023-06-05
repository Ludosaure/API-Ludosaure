import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeletePlanCommand} from "./delete-plan.command";
import {PlanNotFoundException} from "../../exceptions/plan-not-found.exception";
import {PlanEntityRepository} from "../../plan-entity.repository";

@CommandHandler(DeletePlanCommand)
export class DeletePlanHandler implements ICommandHandler<DeletePlanCommand> {
    constructor(private readonly planRepository: PlanEntityRepository) {
    }

    async execute(command: DeletePlanCommand) {
        const foundPlan = await this.planRepository.findById(command.id);
        if (foundPlan == null) {
            throw new PlanNotFoundException();
        }
        await this.planRepository.deletePlan(foundPlan);
    }
}
