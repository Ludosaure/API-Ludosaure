import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReservationNotFoundException } from '../../exceptions/reservation-not-found.exception';
import { ReservationEntityRepository } from '../../reservation-entity.repository';
import { RemoveReservationCommand } from './remove-reservation.command';
import { ReservationCantBeDeletedException } from '../../exceptions/reservation-cant-be-deleted-exception';

@CommandHandler(RemoveReservationCommand)
export class RemoveReservationHandler
  implements ICommandHandler<RemoveReservationCommand>
{
  constructor(private readonly repository: ReservationEntityRepository) {}

  async execute(command: RemoveReservationCommand): Promise<void> {
    const foundReservation = await this.repository.findById(command.id);
    if (foundReservation == null) {
      throw new ReservationNotFoundException();
    }
    if (foundReservation.isPaid) {
      throw new ReservationCantBeDeletedException();
    }

    await this.repository.deleteReservation(foundReservation);
  }
}
