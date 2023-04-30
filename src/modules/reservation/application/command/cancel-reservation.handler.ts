import { CommandHandler } from "@nestjs/cqrs";
import { ReservationNotFoundException } from "../../exceptions/reservation-not-found.exception";
import { ReservationEntityRepository } from "../../reservation-entity.repository";
import { ReservationCantBeModifiedException } from "../../exceptions/reservation-cant-be-modified.exception";
import { CancelReservationCommand } from "./cancel-reservation.command";
import { EmailReservationCanceledService } from "../../../email/email-reservation-canceled.service";

@CommandHandler(CancelReservationCommand)
export class CancelReservationHandler {
  constructor(private readonly repository: ReservationEntityRepository,
              private readonly emailReservationCanceledService: EmailReservationCanceledService) {
  }

  async execute(command: CancelReservationCommand): Promise<void> {
    const foundReservation = await this.repository.findById(command.id);
    if (foundReservation == null) {
      throw new ReservationNotFoundException();
    }
    if (foundReservation.isCancelled || foundReservation.isReturned) {
      throw new ReservationCantBeModifiedException();
    }
    foundReservation.isCancelled = true;
    foundReservation.cancelledDate = new Date();

    await this.repository.saveOrUpdate(foundReservation);

    await this.emailReservationCanceledService.sendConfirmationMail(foundReservation);
  }
}
