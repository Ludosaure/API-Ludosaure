import { HttpException, HttpStatus } from "@nestjs/common";

export class CannotUpdateArchivedGameException extends HttpException {
    constructor() {
        super('Cannot update archived game', HttpStatus.BAD_REQUEST);
    }
}
