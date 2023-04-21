import {HttpException, HttpStatus} from "@nestjs/common";

export class ReservationNotInitializedProperlyException extends HttpException {
    constructor() {
        super("Reservation is not initialized properly", HttpStatus.BAD_REQUEST);
    }
}
