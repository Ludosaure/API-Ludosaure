import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReservationNotFoundException } from '../../exceptions/reservation-not-found.exception';
import { ReservationEntityRepository } from '../../reservation-entity.repository';
import { RemoveReservationCommand } from './remove-reservation.command';
import { ReservationCantBeDeletedException } from '../../exceptions/reservation-cant-be-deleted-exception';
import { InvoiceEntityRepository } from "../../../invoice/invoice-entity.repository";
import { InvoiceGameEntityRepository } from "../../../invoice-game/invoice-game-entity.repository";

@CommandHandler(RemoveReservationCommand)
export class RemoveReservationHandler
  implements ICommandHandler<RemoveReservationCommand>
{
  constructor(private readonly repository: ReservationEntityRepository,
              private readonly invoiceGameRepository: InvoiceGameEntityRepository,
              private readonly invoiceRepository: InvoiceEntityRepository) {}

  async execute(command: RemoveReservationCommand): Promise<void> {
    const foundReservation = await this.repository.findById(command.id);
    if (foundReservation == null) {
      throw new ReservationNotFoundException();
    }
    if (foundReservation.isPaid) {
      throw new ReservationCantBeDeletedException();
    }
    const invoices = await this.invoiceRepository.findByReservationId(foundReservation.id);

    for (const invoice of invoices) {
      const invoiceGames = await this.invoiceGameRepository.findByInvoiceId(invoice.id);
      for (const invoiceGame of invoiceGames) {
        await this.invoiceGameRepository.remove(invoiceGame);
      }
      await this.invoiceRepository.remove(invoice);
    }

    await this.repository.deleteReservation(foundReservation);
  }
}
