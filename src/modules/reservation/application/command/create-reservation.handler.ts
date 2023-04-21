import {CommandHandler} from "@nestjs/cqrs";
import {CreateReservationCommand} from "./create-reservation.command";
import {ReservationEntityRepository} from "../../reservation-entity.repository";
import {Reservation} from "../../../../domain/model/reservation.entity";
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";
import {UserEntityRepository} from "../../../user/user-entity.repository";
import {GameEntityRepository} from "../../../game/game-entity.repository";

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler {
    constructor(private readonly reservationRepository: ReservationEntityRepository,
                private readonly userRepository: UserEntityRepository,
                private readonly gameRepository: GameEntityRepository) {
    }

    async execute(command: CreateReservationCommand): Promise<void> {
        const foundUser = await this.userRepository.findById(command.userId);
        if(foundUser == null) {
            throw new UserNotFoundException();
        }
        const games = [];
        for (const gameId of command.games) {
            const foundGame = await this.gameRepository.findById(gameId);
            if(foundGame == null) {
                throw new GameNotFoundException();
            }
            games.push(foundGame);
        }
        const reservation = new Reservation();
        //TODO reste des attributs
        reservation.startDate = command.startDate;
        reservation.endDate = command.endDate;
        reservation.user = foundUser;
        reservation.games = games;
        await this.reservationRepository.saveOrUpdate(reservation);
    }
}
