import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ReservationEntityRepository } from "../reservation/reservation-entity.repository";
import { EmailLastDayReservationService } from "./mail-bodies/email-last-day-reservation.service";
import { EmailLateReservationService } from "./mail-bodies/email-late-reservation.service";

const logger = new Logger("bootstrap");

@Injectable()
export default class EmailSchedulingService {

  constructor(private reservationRepository: ReservationEntityRepository,
              private emailLastDayReservationService: EmailLastDayReservationService,
              private emailLateReservationService: EmailLateReservationService) {
  }

  @Cron("0 15 * * *") // Every day at 8 AM
  async sendLastDayReservationMails() {
    const lastDayReservations = await this.reservationRepository.findLastDayReservations();
    const numberOfMailsToSend = lastDayReservations.filter(reservation => reservation.user.hasEnabledMailNotifications).length;
    logger.log("Sending last day reservation mails for " + numberOfMailsToSend + " reservations");
    for (const reservation of lastDayReservations) {
      if (reservation.user.hasEnabledMailNotifications)
        await this.emailLastDayReservationService.sendReminderMail(reservation);
    }
  }

  @Cron("0 15 * * *") // Every day at 8 AM
  async sendLateMails() {
    const lateReservations = await this.reservationRepository.findLateReservations();
    logger.log("Sending late reservation mails for " + lateReservations.length + " reservations");
    for (const reservation of lateReservations) {
      await this.emailLateReservationService.sendLateMail(reservation);
    }
  }
}
