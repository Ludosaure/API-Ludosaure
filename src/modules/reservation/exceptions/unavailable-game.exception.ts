import { HttpException, HttpStatus } from "@nestjs/common";
import { Game } from "../../../domain/model/game.entity";
import { Unavailability } from "../../../domain/model/unavailability.entity";

export class UnavailableGameException extends HttpException {
  constructor(game: Game, unavailabilities: Unavailability[]) {
    super(`Game ${game.name} is unavailable on ${unavailabilities.map(unavailability => unavailability.date.toDateString()).join(", ")}`, HttpStatus.BAD_REQUEST);
  }
}
