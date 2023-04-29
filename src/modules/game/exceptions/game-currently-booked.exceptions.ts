import {HttpException, HttpStatus} from "@nestjs/common";

export class GameCurrentlyBookedExceptions extends HttpException {
    constructor() {
        super('Game is currently booked', HttpStatus.BAD_REQUEST);
    }
}
