import { UpdateReservationRequestDto } from "../../dto/request/update-reservation-request.dto";
import { User } from "../../../../domain/model/user.entity";

export class UpdateReservationCommand {
  public readonly id: string;
  public readonly endDate: Date;
  public readonly user: User;

  private constructor(id: string, endDate: Date, user: User) {
    this.id = id;
    this.endDate = endDate;
    this.user = user;
  }

  public static of(updateReservationRequest: UpdateReservationRequestDto, user: User): UpdateReservationCommand {
    const { reservationId, endDate } = updateReservationRequest;
    return new UpdateReservationCommand(reservationId, endDate, user);
  }
}
