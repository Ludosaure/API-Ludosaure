import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
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
import {InvalidDateException} from "../../exceptions/invalid-date.exception";
import { UnavailabilityEntityRepository } from "../../../unavailability/unavailability-entity.repository";
import { UnavailableGameException } from "../../exceptions/unavailable-game.exception";
import {PlanNotFoundException} from "../../../plan/exceptions/plan-not-found.exception";

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler implements ICommandHandler<CreateReservationCommand> {
    constructor(private readonly reservationRepository: ReservationEntityRepository,
                private readonly userRepository: UserEntityRepository,
                private readonly gameRepository: GameEntityRepository,
                private readonly planRepository: PlanEntityRepository,
                private readonly unavailabilityRepository: UnavailabilityEntityRepository,
                private readonly invoiceService: InvoiceService) {
    }

    async execute(command: CreateReservationCommand): Promise<String> {
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

        const weeks = DateUtils.getNbWeeksBetween(startDate, endDate);

        const reservation = new Reservation();
        reservation.createdAt = new Date();
        reservation.startDate = startDate;
        reservation.endDate = endDate;
        reservation.nbWeeks = weeks;
        reservation.user = foundUser;
        reservation.games = games;
        const plan = await this.planRepository.findAppliedPlanByNbWeeks(weeks);

        if(plan == null) {
            throw new PlanNotFoundException();
        }

        reservation.appliedPlan = plan;

        reservation.totalAmount = reservation.calculateTotalAmount();

        const newReservation = await this.reservationRepository.saveOrUpdate(reservation);
        await this.invoiceService.createInvoice(reservation.totalAmount, reservation);

        return newReservation.id;
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
