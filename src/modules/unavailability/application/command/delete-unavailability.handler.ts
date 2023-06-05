import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteUnavailabilityCommand} from "./delete-unavailability.command";
import {UnavailabilityEntityRepository} from "../../unavailability-entity.repository";
import {UnavailabilityNotFoundException} from "../../exceptions/unavailability-not-found.exception";

@CommandHandler(DeleteUnavailabilityCommand)
export class DeleteUnavailabilityHandler implements ICommandHandler<DeleteUnavailabilityCommand> {
    constructor(private readonly unavailabilityRepository: UnavailabilityEntityRepository) {
    }

    async execute(command: DeleteUnavailabilityCommand): Promise<void> {
        const foundUnavailability = await this.unavailabilityRepository.findById(command.id)
        if(foundUnavailability == null) {
            throw new UnavailabilityNotFoundException();
        }
        await this.unavailabilityRepository.deleteUnavailability(foundUnavailability);
    }
}
