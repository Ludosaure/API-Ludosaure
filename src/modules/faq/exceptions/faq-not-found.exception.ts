import {HttpException, HttpStatus} from "@nestjs/common";

export class FaqNotFoundException extends HttpException {
    constructor() {
        super('Faq not found', HttpStatus.NOT_FOUND);
    }
}
