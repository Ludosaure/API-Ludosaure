import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUnavailabilityCommand} from "./create-unavailability.command";
import {GameEntityRepository} from "../../../game/game-entity.repository";
import {UnavailabilityEntityRepository} from "../../unavailability-entity.repository";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";
import {Unavailability} from "../../../../domain/model/unavailability.entity";
import {
    GameAlreadyUnavailableForThisDateException
} from "../../exceptions/game-already-unavailable-for-this-date.exception";

@CommandHandler(CreateUnavailabilityCommand)
export class CreateUnavailabilityHandler implements ICommandHandler<CreateUnavailabilityCommand> {
    constructor(private readonly unavailabilityRepository: UnavailabilityEntityRepository,
                private readonly gameRepository: GameEntityRepository) {
    }

    async execute(command: CreateUnavailabilityCommand): Promise<void> {
        const foundGame = await this.gameRepository.findById(command.gameId);
        if(foundGame == null) {
            throw new GameNotFoundException();
        }
        const foundUnavailability = await this.unavailabilityRepository.findByGameIdAndDate(command.gameId, command.date);
        if(foundUnavailability != null) {
            throw new GameAlreadyUnavailableForThisDateException();
        }
        const unavailability = new Unavailability();
        unavailability.date = command.date;
        unavailability.game = foundGame;
        await this.unavailabilityRepository.saveUnavailability(unavailability);
    }
}
