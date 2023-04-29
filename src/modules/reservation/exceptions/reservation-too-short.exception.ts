import {HttpException, HttpStatus} from "@nestjs/common";

export class ReservationTooShortException extends HttpException {
    constructor() {
        super("Reservation must be at least 1 week long", HttpStatus.BAD_REQUEST);
    }
}
