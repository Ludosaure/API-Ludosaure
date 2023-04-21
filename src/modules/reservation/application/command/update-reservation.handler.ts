import {CommandHandler} from "@nestjs/cqrs";
import {UpdateReservationCommand} from "./update-reservation.command";
import {ReservationNotFoundException} from "../../exceptions/reservation-not-found.exception";
import {ReservationEntityRepository} from "../../reservation-entity.repository";
import {
    EndDateBiggerThanStartDateException
} from "../../../../shared/exceptions/end-date-bigger-than-start-date.exception";
import {PlanEntityRepository} from "../../../plan/plan-entity.repository";

@CommandHandler(UpdateReservationCommand)
export class UpdateReservationHandler {
    constructor(private readonly repository: ReservationEntityRepository,
                private readonly planRepository: PlanEntityRepository) {
    }

    async execute(command: UpdateReservationCommand): Promise<void> {
        const foundReservation = await this.repository.findById(command.id);
        if (foundReservation == null) {
            throw new ReservationNotFoundException();
        }
        if (command.startDate != null || command.endDate != null) {
            if (command.startDate != null) {
                foundReservation.startDate = command.startDate;
            }
            if (command.endDate != null) {
                foundReservation.endDate = command.endDate;
            }
            if (foundReservation.startDate > foundReservation.endDate) {
                throw new EndDateBiggerThanStartDateException();
            }
            foundReservation.appliedPlan = await this.planRepository.findByDuration(foundReservation.startDate, foundReservation.endDate);
            foundReservation.totalAmount = foundReservation.calculateTotalAmount();
        }
        if (command.isReturned != null) {
            foundReservation.isReturned = command.isReturned;
        }
        if (command.isCancelled != null) {
            foundReservation.isCancelled = command.isCancelled;
        }
        await this.repository.saveOrUpdate(foundReservation);

        // TODO - Générer une nouvelle facture pour la même réservation.
        //  Il faut factuer la différence entre le montant total de la réservation et le montant déjà facturé.
        // TODO - Envoyer un email à l'utilisateur
    }
}
