import {CommandHandler} from "@nestjs/cqrs";
import {UpdateReservationCommand} from "./update-reservation.command";
import {ReservationNotFoundException} from "../../exceptions/reservation-not-found.exception";
import {ReservationEntityRepository} from "../../reservation-entity.repository";
import {PlanEntityRepository} from "../../../plan/plan-entity.repository";
import InvoiceService from "../../../invoice/invoice.service";
import {InvalidDateException} from "../../exceptions/invalid-date.exception";
import {ReservationAlreadyEndedException} from "../../exceptions/reservation-already-ended.exception";
import {DateUtils} from "../../../../shared/date.utils";
import {IncoherentAmountException} from "../../exceptions/incoherent-amount.exception";
import {EmailReservationConfirmationService} from "../../../email/email-reservation-confirmation.service";

@CommandHandler(UpdateReservationCommand)
export class UpdateReservationHandler {
    constructor(private readonly repository: ReservationEntityRepository,
                private readonly planRepository: PlanEntityRepository,
                private readonly invoiceService: InvoiceService,
                private readonly emailReservationConfirmationService: EmailReservationConfirmationService) {
    }

    async execute(command: UpdateReservationCommand): Promise<void> {
        const foundReservation = await this.repository.findById(command.id);
        if (foundReservation == null) {
            throw new ReservationNotFoundException();
        }
        if (command.endDate != null) {
            const newEndDate = new Date(command.endDate);
            this.checkDates(newEndDate, foundReservation.startDate, foundReservation.endDate);
            foundReservation.endDate = newEndDate;
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

        const facturedAmount = await this.invoiceService.getFacturedAmountForReservation(foundReservation.id);
        const restToPay = foundReservation.totalAmount - facturedAmount;
        if (restToPay <= 0) {
            throw new IncoherentAmountException(restToPay);
        }
        await this.invoiceService.createInvoice(restToPay, foundReservation);
        await this.emailReservationConfirmationService.sendConfirmationMail(foundReservation, true);
    }

    private checkDates(newEndDate: Date, currentStartDate: Date, currentEndDate: Date) {
        if (currentEndDate < new Date()) {
            throw new ReservationAlreadyEndedException();
        }

        DateUtils.checkIfStartDateIsBeforeEndDate(currentStartDate, newEndDate);

        if (newEndDate < currentEndDate) {
            throw new InvalidDateException('Reservation can only be extended');
        }
    }
}
