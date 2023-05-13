import { HttpException, HttpStatus } from "@nestjs/common";

export class NotAllowedToUpdateReservationException extends HttpException {
  constructor() {
    super("You are not allowed to update this reservation.", HttpStatus.FORBIDDEN);
  }
}
