import {CreateUnavailabilityRequestDto} from "../../dto/request/create-unavailability-request.dto";

export class CreateUnavailabilityCommand {
    public readonly gameId: string;
    public readonly date: Date;
    constructor(gameId: string, date: Date) {
        this.gameId = gameId;
        this.date = date;
    }
    public static of(
        createUnavailabilityRequest: CreateUnavailabilityRequestDto,
    ): CreateUnavailabilityCommand {
        const { gameId, date } = createUnavailabilityRequest;
        return new CreateUnavailabilityCommand(gameId, date);
    }
}
