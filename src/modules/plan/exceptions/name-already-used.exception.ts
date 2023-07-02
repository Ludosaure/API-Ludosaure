import {HttpException, HttpStatus} from "@nestjs/common";

export class NameAlreadyUsedException extends HttpException {
    constructor() {
        super('Name already used', HttpStatus.CONFLICT);
    }
}
