import {HttpException, HttpStatus} from "@nestjs/common";

export class ReservationAlreadyEndedException extends HttpException {
    constructor() {
        super("The reservation has already ended", HttpStatus.BAD_REQUEST);
    }
}
