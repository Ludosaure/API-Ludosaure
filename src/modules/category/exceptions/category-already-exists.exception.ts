import {HttpException, HttpStatus} from "@nestjs/common";

export class CategoryAlreadyExistsException extends HttpException {
    constructor() {
        super('Category already exists', HttpStatus.CONFLICT);
    }
}
