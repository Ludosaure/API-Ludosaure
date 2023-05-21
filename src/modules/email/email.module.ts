import { Module } from "@nestjs/common";
import EmailService from "./email.service";
import { ConfigModule } from "@nestjs/config";
import EmailSchedulingService from "./email-scheduling.service";
import { ReservationEntityRepository } from "../reservation/reservation-entity.repository";
import Mail from "nodemailer/lib/mailer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reservation } from "../../domain/model/reservation.entity";
import { EmailLastDayReservationService } from "./mail-bodies/email-last-day-reservation.service";
import { EmailLateReservationService } from "./mail-bodies/email-late-reservation.service";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Reservation]),
  ],
  providers: [
    EmailService,
    EmailSchedulingService,
    ReservationEntityRepository,
    EmailLastDayReservationService,
    EmailLateReservationService,
  ]
})
export class EmailModule {
}
