import {HttpException, HttpStatus} from "@nestjs/common";

export class ReservationAlreadyPaidException extends HttpException {
    constructor() {
        super("The reservation is already paid", HttpStatus.BAD_REQUEST);
    }
}
