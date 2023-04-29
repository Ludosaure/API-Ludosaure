import {CommandHandler} from "@nestjs/cqrs";
import {GameEntityRepository} from "../../game-entity.repository";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";
import {DeleteGameCommand} from "./delete-game.command";
import {ReservationEntityRepository} from "../../../reservation/reservation-entity.repository";
import {GameCurrentlyBookedExceptions} from "../../exceptions/game-currently-booked.exceptions";

@CommandHandler(DeleteGameCommand)
export class DeleteGameHandler {

    constructor(private readonly gameRepository: GameEntityRepository,
                private readonly reservationRepository: ReservationEntityRepository) {
    }

    async execute(command: DeleteGameCommand): Promise<void> {
        const foundGame = await this.gameRepository.findOneBy({id: command.id});
        if (foundGame == null) {
            throw new GameNotFoundException();
        }
        const reservations = await this.reservationRepository.findCurrentOrFutureReservationsByGameId(foundGame.id);
        if (reservations.length > 0) {
            throw new GameCurrentlyBookedExceptions();
        }
        await this.gameRepository.deleteGame(foundGame);
    }
}
