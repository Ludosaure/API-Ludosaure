import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteUnavailabilityCommand} from "./delete-unavailability.command";
import {UnavailabilityEntityRepository} from "../../unavailability-entity.repository";
import {UnavailabilityNotFoundException} from "../../exceptions/unavailability-not-found.exception";
import { GameNotFoundException } from "../../../../shared/exceptions/game-not-found.exception";
import { GameEntityRepository } from "../../../game/game-entity.repository";

@CommandHandler(DeleteUnavailabilityCommand)
export class DeleteUnavailabilityHandler implements ICommandHandler<DeleteUnavailabilityCommand> {
    constructor(private readonly unavailabilityRepository: UnavailabilityEntityRepository,
                private readonly gameRepository: GameEntityRepository) {
    }

    async execute(command: DeleteUnavailabilityCommand): Promise<void> {
        const foundGame = await this.gameRepository.findById(command.gameId);
        if (foundGame == null) {
            throw new GameNotFoundException();
        }
        const foundUnavailability = await this.unavailabilityRepository.findByGameIdAndDate(command.gameId, new Date(command.date));
        if (foundUnavailability == null) {
            throw new UnavailabilityNotFoundException();
        }
        await this.unavailabilityRepository.deleteUnavailability(foundUnavailability);
    }
}