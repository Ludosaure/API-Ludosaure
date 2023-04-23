import {CommandHandler} from "@nestjs/cqrs";
import {GameEntityRepository} from "../../game-entity.repository";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";
import {DeleteGameCommand} from "./delete-game.command";
import {ReservationEntityRepository} from "../../../reservation/reservation-entity.repository";
import {GameIsInReservationsExceptions} from "../../exceptions/game-is-in-reservations.exceptions";

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
        const reservations = await this.reservationRepository.findCurrentReservationsByGameId(foundGame.id);
        if (reservations.length > 0) {
            throw new GameIsInReservationsExceptions();
        }
        // TODO : actuellement ça perd la trace des réservations qui ont été faites sur ce jeu,
        //  à voir avec les gars pour juste le passer en "archivé" ou "désactivé"
        await this.gameRepository.deleteGame(foundGame);
    }
}
