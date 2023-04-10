import {HttpException, HttpStatus} from "@nestjs/common";

export class ReductionAlreadyExistsException extends HttpException {
    constructor() {
        super('Reduction already exists', HttpStatus.BAD_REQUEST);
    }
}
