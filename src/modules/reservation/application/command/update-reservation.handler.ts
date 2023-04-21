import {CommandHandler} from "@nestjs/cqrs";
import {UpdateReservationCommand} from "./update-reservation.command";
import {ReservationRepository} from "../../../../infrastructure/reservation.repository";
import {ReservationNotFoundException} from "../../exceptions/reservation-not-found.exception";

@CommandHandler(UpdateReservationCommand)
export class UpdateReservationHandler {
    constructor(private readonly repository: ReservationRepository) {
    }

    async execute(command: UpdateReservationCommand): Promise<void> {
        const foundReservation = await this.repository.findById(command.id);
        if(foundReservation == null) {
            throw new ReservationNotFoundException();
        }
        if(command.startDate != null) {
            foundReservation.startDate = command.startDate;
        }
        if(command.endDate != null) {
            foundReservation.endDate = command.endDate;
        }
        // TODO calculer nouveau prix
        if(command.isReturned != null) {
            foundReservation.isReturned = command.isReturned;
        }
        if(command.isCancelled != null) {
            foundReservation.isCancelled = command.isCancelled;
        }
        await this.repository.saveOrUpdate(foundReservation);
    }
}
