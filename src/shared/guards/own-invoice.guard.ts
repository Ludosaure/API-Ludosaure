import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "../../domain/model/enum/role";
import { User } from "../../domain/model/user.entity";
import { ReservationNotFoundException } from "../../modules/reservation/exceptions/reservation-not-found.exception";
import { InvoiceEntityRepository } from "../../modules/invoice/invoice-entity.repository";
import { InvoiceNotFoundException } from "../../modules/invoice/exceptions/invoice-not-found.exception";

@Injectable()
export class OwnInvoiceGuard implements CanActivate {
  constructor(private readonly invoiceRepository: InvoiceEntityRepository) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;
    if (req.body.invoiceId == null && req.params.invoiceId == null) {
      return false;
    }
    let invoiceId;
    if (req.body.invoiceId != null) {
      invoiceId = req.body.invoiceId;
    } else {
      invoiceId = req.params.invoiceId;
    }
    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (invoice == null) {
      throw new InvoiceNotFoundException();
    }
    return user.isAccountActive() && (req.user.role == Role.ADMIN.toString() || user.id === invoice.reservation.user.id);
  }
}
