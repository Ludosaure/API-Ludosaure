import {HttpException, HttpStatus} from "@nestjs/common";

export class GameIsInReservationsExceptions extends HttpException {
    constructor() {
        super('Game is currently in reservation', HttpStatus.BAD_REQUEST);
    }
}
