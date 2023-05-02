import { UpdateReservationRequestDto } from "../../dto/request/update-reservation-request.dto";

export class UpdateReservationCommand {
  public readonly id: string;
  public readonly endDate: Date;

  private constructor(id: string, endDate: Date) {
    this.id = id;
    this.endDate = endDate;
  }

  public static of(updateReservationRequest: UpdateReservationRequestDto): UpdateReservationCommand {
    const { id, endDate } = updateReservationRequest;
    return new UpdateReservationCommand(id, endDate);
  }
}
