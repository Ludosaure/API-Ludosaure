import { DeleteUnavailabilityRequestDto } from "../../dto/request/delete-unavailability-request.dto";

export class DeleteUnavailabilityCommand {
  public readonly gameId: string;
  public readonly date: Date;

  private constructor(gameId: string, date: Date) {
    this.gameId = gameId;
    this.date = date;
  }

  public static of(
    deleteUnavailabilityRequest: DeleteUnavailabilityRequestDto
  ): DeleteUnavailabilityCommand {
    const { gameId, date } = deleteUnavailabilityRequest;
    return new DeleteUnavailabilityCommand(gameId, date);
  }
}
