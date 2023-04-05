import {HttpException, HttpStatus} from "@nestjs/common";

export class GameAlreadyUnavailableForThisDateException extends HttpException {
  constructor() {
    super('Game already unavailable for this date', HttpStatus.CONFLICT);
  }
}
