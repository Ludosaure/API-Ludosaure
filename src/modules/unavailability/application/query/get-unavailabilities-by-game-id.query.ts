import {GetUnavailabilitiesByGameIdRequestDto} from "../../dto/request/get-unavailabilities-by-game-id-request.dto";

export class GetUnavailabilitiesByGameIdQuery {
  public readonly gameId: string;
  constructor(gameId: string) {
    this.gameId = gameId;
  }
  public static of(
    getUnavailabilitiesByGameIdRequest: GetUnavailabilitiesByGameIdRequestDto,
  ): GetUnavailabilitiesByGameIdQuery {
    const { gameId } = getUnavailabilitiesByGameIdRequest;
    return new GetUnavailabilitiesByGameIdQuery(gameId);
  }
}
