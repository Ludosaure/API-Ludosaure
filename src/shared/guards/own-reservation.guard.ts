import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "../../domain/model/enum/role";
import { User } from "../../domain/model/user.entity";
import { ReservationEntityRepository } from "../../modules/reservation/reservation-entity.repository";
import { PlanEntityRepository } from "../../modules/plan/plan-entity.repository";
import { UnavailabilityEntityRepository } from "../../modules/unavailability/unavailability-entity.repository";
import InvoiceService from "../../modules/invoice/invoice.service";
import { EmailReservationConfirmationService } from "../../modules/email/email-reservation-confirmation.service";

@Injectable()
export class OwnReservationGuard implements CanActivate {
  constructor(private readonly reservationRepository: ReservationEntityRepository) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;
    if (req.body.reservationId == null && req.params.reservationId == null) {
      return false;
    }
    let reservationId;
    if (req.body.reservationId != null) {
      reservationId = req.body.reservationId;
    } else {
      reservationId = req.params.reservationId;
    }
    const reservation = await this.reservationRepository.findById(reservationId);
    if (reservation == null) {
      return false;
    }
    return user.isAccountActive() && (req.user.role == Role.ADMIN.toString() || user.id === reservation.user.id);
  }
}
