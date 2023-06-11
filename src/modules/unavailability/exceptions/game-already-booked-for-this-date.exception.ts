import {HttpException, HttpStatus} from "@nestjs/common";

export class GameAlreadyBookedForThisDateException extends HttpException {
  constructor() {
    super('Game already booked for this date', HttpStatus.CONFLICT);
  }
}
