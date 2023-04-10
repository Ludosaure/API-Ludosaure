import {DeleteUnavailabilityRequestDto} from "../../dto/request/delete-unavailability-request.dto";

export class DeleteUnavailabilityCommand {
  public readonly id: string;
  constructor(id: string) {
    this.id = id;
  }
  public static of(
    deleteUnavailabilityRequest: DeleteUnavailabilityRequestDto,
  ): DeleteUnavailabilityCommand {
    const { id } = deleteUnavailabilityRequest;
    return new DeleteUnavailabilityCommand(id);
  }
}
