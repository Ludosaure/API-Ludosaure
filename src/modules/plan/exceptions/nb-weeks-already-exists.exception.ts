import {HttpException, HttpStatus} from "@nestjs/common";

export class NbWeeksAlreadyExistsException extends HttpException {
    constructor() {
        super('Number of weeks already exists', HttpStatus.CONFLICT);
    }
}
