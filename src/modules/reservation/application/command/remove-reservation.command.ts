import { RemoveReservationRequestDto } from '../../dto/request/remove-reservation-request.dto';

export class RemoveReservationCommand {
  public readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  public static of(
    removeReservationRequestDto: RemoveReservationRequestDto,
  ): RemoveReservationCommand {
    const { reservationId } = removeReservationRequestDto;
    return new RemoveReservationCommand(reservationId);
  }
}
