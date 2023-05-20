import { CommandHandler } from "@nestjs/cqrs";
import { ReservationNotFoundException } from "../../exceptions/reservation-not-found.exception";
import { ReservationEntityRepository } from "../../reservation-entity.repository";
import { ReservationCantBeModifiedException } from "../../exceptions/reservation-cant-be-modified.exception";
import { ReturnReservationCommand } from "./return-reservation.command";
import { EmailReservationReturnedService } from "../../../email/email-reservation-returned.service";
import { FavoriteService } from "../../../favorite/favorite.service";
import { PayReservationCommand } from "./pay-reservation.command";
import { ReservationAlreadyEndedException } from "../../exceptions/reservation-already-ended.exception";
import { ReservationAlreadyPaidException } from "../../exceptions/reservation-already-paid.exception";
import { EmailReservationConfirmationService } from "../../../email/email-reservation-confirmation.service";

@CommandHandler(PayReservationCommand)
export class PayReservationHandler {
  constructor(private readonly reservationRepository: ReservationEntityRepository,
              private readonly emailReservationConfirmationService: EmailReservationConfirmationService) {
  }

  async execute(command: PayReservationCommand): Promise<void> {
    const foundReservation = await this.reservationRepository.findById(command.reservationId);
    if (foundReservation == null) {
      throw new ReservationNotFoundException();
    }
    if (foundReservation.isCancelled || foundReservation.isReturned) {
      throw new ReservationCantBeModifiedException();
    }
    if(foundReservation.endDate < new Date()) {
      throw new ReservationAlreadyEndedException();
    }
    if(foundReservation.isPaid) {
      throw new ReservationAlreadyPaidException();
    }
    foundReservation.isPaid = true;

    await this.reservationRepository.saveOrUpdate(foundReservation);

    await this.emailReservationConfirmationService.sendConfirmationMail(foundReservation, false);
  }
}
