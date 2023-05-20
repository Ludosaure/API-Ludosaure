import { CommandHandler } from "@nestjs/cqrs";
import { UpdateReservationCommand } from "./update-reservation.command";
import { ReservationNotFoundException } from "../../exceptions/reservation-not-found.exception";
import { ReservationEntityRepository } from "../../reservation-entity.repository";
import { PlanEntityRepository } from "../../../plan/plan-entity.repository";
import InvoiceService from "../../../invoice/invoice.service";
import { IncoherentAmountException } from "../../exceptions/incoherent-amount.exception";
import { EmailReservationConfirmationService } from "../../../email/email-reservation-confirmation.service";
import { ReservationCantBeModifiedException } from "../../exceptions/reservation-cant-be-modified.exception";
import { UnavailabilityEntityRepository } from "../../../unavailability/unavailability-entity.repository";
import { UnavailableGameException } from "../../exceptions/unavailable-game.exception";

@CommandHandler(UpdateReservationCommand)
export class UpdateReservationHandler {
  constructor(private readonly reservationRepository: ReservationEntityRepository,
              private readonly planRepository: PlanEntityRepository,
              private readonly unavailabilityRepository: UnavailabilityEntityRepository,
              private readonly invoiceService: InvoiceService,
              private readonly emailReservationConfirmationService: EmailReservationConfirmationService) {
  }

  async execute(command: UpdateReservationCommand): Promise<void> {
    const foundReservation = await this.reservationRepository.findById(command.id);
    if (foundReservation == null) {
      throw new ReservationNotFoundException();
    }
    if (foundReservation.isCancelled || foundReservation.isReturned) {
      throw new ReservationCantBeModifiedException();
    }
    if (command.endDate != null) {
      const newEndDate = new Date(command.endDate);
      if (foundReservation.areDatesValid(newEndDate)) {
        for (const game of foundReservation.games) {
          const unavailabilities = await this.unavailabilityRepository.findBetweenDates(game.id, foundReservation.startDate, command.endDate);
          if (unavailabilities.length > 0) {
            throw new UnavailableGameException(game, unavailabilities);
          }
        }
        foundReservation.endDate = newEndDate;
        foundReservation.appliedPlan = await this.planRepository.findByDuration(foundReservation.startDate, foundReservation.endDate);
        foundReservation.totalAmount = foundReservation.calculateTotalAmount();
      }
    }
    await this.reservationRepository.saveOrUpdate(foundReservation);

    const facturedAmount = await this.invoiceService.getFacturedAmountForReservation(foundReservation.id);
    const restToPay = foundReservation.totalAmount - facturedAmount;
    if (restToPay <= 0) {
      throw new IncoherentAmountException(restToPay);
    }
    await this.invoiceService.createInvoice(restToPay, foundReservation);
    await this.emailReservationConfirmationService.sendConfirmationMail(foundReservation, true);
  }
}
