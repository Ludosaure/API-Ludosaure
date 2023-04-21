import {CommandHandler} from "@nestjs/cqrs";
import {CreateReservationCommand} from "./create-reservation.command";
import {ReservationEntityRepository} from "../../reservation-entity.repository";
import {Reservation} from "../../../../domain/model/reservation.entity";
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";
import {UserEntityRepository} from "../../../user/user-entity.repository";
import {GameEntityRepository} from "../../../game/game-entity.repository";
import {Game} from "../../../../domain/model/game.entity";
import {DateUtils} from "../../../../shared/date.utils";
import {ReservationTooShortException} from "../../exceptions/reservation-too-short.exception";
import {
    EndDateBiggerThanStartDateException
} from "../../../../shared/exceptions/end-date-bigger-than-start-date.exception";
import {PlanEntityRepository} from "../../../plan/plan-entity.repository";

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler {
    constructor(private readonly reservationRepository: ReservationEntityRepository,
                private readonly userRepository: UserEntityRepository,
                private readonly gameRepository: GameEntityRepository,
                private readonly planRepository: PlanEntityRepository) {
    }

    async execute(command: CreateReservationCommand): Promise<void> {
        const foundUser = await this.userRepository.findById(command.userId);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        const games = [];
        for (const gameId of command.games) {
            const foundGame = await this.gameRepository.findById(gameId);
            if (foundGame == null) {
                throw new GameNotFoundException();
            }
            games.push(foundGame);
        }
        const {startDate, endDate} = command;
        if (startDate > endDate) {
            throw new EndDateBiggerThanStartDateException();
        }
        const reservation = new Reservation();
        reservation.createdAt = new Date();
        reservation.startDate = startDate;
        reservation.endDate = endDate;
        reservation.user = foundUser;
        reservation.games = games;
        reservation.appliedPlan = await this.planRepository.findByDuration(startDate, endDate);
        reservation.totalAmount = reservation.calculateTotalAmount();

        await this.reservationRepository.saveOrUpdate(reservation);

        // TODO - Generate invoice
        // TODO - Send email to user
    }
}
