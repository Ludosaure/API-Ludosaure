import {CommandHandler} from "@nestjs/cqrs";
import {CreateReservationCommand} from "./create-reservation.command";
import {ReservationEntityRepository} from "../../reservation-entity.repository";
import {Reservation} from "../../../../domain/model/reservation.entity";
import {UserNotFoundException} from "../../../../shared/exceptions/user-not-found.exception";
import {GameNotFoundException} from "../../../../shared/exceptions/game-not-found.exception";
import {UserEntityRepository} from "../../../user/user-entity.repository";
import {GameEntityRepository} from "../../../game/game-entity.repository";
import {PlanEntityRepository} from "../../../plan/plan-entity.repository";
import InvoiceService from "../../../invoice/invoice.service";
import {DateUtils} from "../../../../shared/date.utils";
import {Game} from "../../../../domain/model/game.entity";
import {EmailReservationConfirmationService} from "../../../email/email-reservation-confirmation.service";
import {InvalidDateException} from "../../exceptions/invalid-date.exception";
import { UnavailabilityEntityRepository } from "../../../unavailability/unavailability-entity.repository";
import { UnavailableGameException } from "../../exceptions/unavailable-game.exception";

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler {
    constructor(private readonly reservationRepository: ReservationEntityRepository,
                private readonly userRepository: UserEntityRepository,
                private readonly gameRepository: GameEntityRepository,
                private readonly planRepository: PlanEntityRepository,
                private readonly unavailabilityRepository: UnavailabilityEntityRepository,
                private readonly invoiceService: InvoiceService,
                private readonly emailReservationConfirmationService: EmailReservationConfirmationService) {
    }

    async execute(command: CreateReservationCommand): Promise<void> {
        const foundUser = await this.userRepository.findById(command.userId);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        const games = await this.initGames(command.games);

        const {startDate, endDate} = command;
        DateUtils.checkIfStartDateIsBeforeEndDate(startDate, endDate);
        if(startDate < new Date()) {
            throw new InvalidDateException('Reservation start date can not be in the past');
        }

        for(const game of games) {
            const unavailabilities = await this.unavailabilityRepository.findBetweenDates(game.id, startDate, endDate);
            if(unavailabilities.length > 0) {
                throw new UnavailableGameException(game, unavailabilities);
            }
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
        await this.invoiceService.createInvoice(reservation.totalAmount, reservation);
        await this.emailReservationConfirmationService.sendConfirmationMail(reservation, false);
    }

    private async initGames(gamesId: string[]): Promise<Game[]> {
        const games = [];
        for (const gameId of gamesId) {
            const foundGame = await this.gameRepository.findById(gameId);
            if (foundGame == null) {
                throw new GameNotFoundException();
            }
            games.push(foundGame);
        }
        return games;
    }
}
