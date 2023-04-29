import {HttpException, HttpStatus} from "@nestjs/common";

export class ReservationNotFoundException extends HttpException {
    constructor() {
        super("Reservation not found", HttpStatus.NOT_FOUND);
    }
}
